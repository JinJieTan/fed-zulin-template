import React from 'react';
import { Badge, Menu } from 'antd';
import { Link } from 'dva/router';
import FedIcon from '@c/FedIcon';
import { getKey } from './menuRoutes';
import './index.less';

interface Props {
    collapsed: boolean;
    menuList: any[];
    workflow: any;
    pathname: string;
}

interface State {
    selectedKey: string;
    inlineOpenKeys: string[];
    verticalOpenKeys: string[];
}

const { SubMenu } = Menu;

const getSelectedMenuInfo = (pathname: string): State => {
    const path = `/middleground${pathname}`;
    const defaultSelectedKey = getKey(path).code;
    const defaultOpenKeys = [getKey(path).key];
    return {
        selectedKey: defaultSelectedKey || '', // 默认的选中菜单栏
        //@ts-ignore
        inlineOpenKeys: defaultOpenKeys || [],
        //@ts-ignore
        verticalOpenKeys: defaultOpenKeys || [],
    };
};

export default class Menus extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.changeMenuItem = this.changeMenuItem.bind(this);
        this.changeSub = this.changeSub.bind(this);
        this.state = getSelectedMenuInfo(props.pathname);
    }

    componentDidUpdate(prevProps: Props) {
        const { pathname } = this.props;
        if (pathname !== prevProps.pathname) {
            this.setState(getSelectedMenuInfo(pathname));
        }
    }

    render() {
        const { menuList = [], workflow = {}, collapsed } = this.props;
        const { selectedKey, inlineOpenKeys, verticalOpenKeys } = this.state;
        return (
            <Menu
                className="rental-menu"
                mode={collapsed ? 'vertical' : 'inline'}
                theme="dark"
                onClick={this.changeMenuItem}
                onOpenChange={this.changeSub}
                selectedKeys={[selectedKey]}
                openKeys={collapsed ? inlineOpenKeys : verticalOpenKeys}
            >
                {(menuList || []).map(menuItem => (
                    <SubMenu
                        key={menuItem.func_code}
                        title={
                            <span>
                                <Badge dot={menuItem.func_code === 'Approval' && workflow.total_todo}>
                                    <FedIcon style={{ marginRight: 0 }} type={menuItem.icon} />
                                </Badge>
                                {!collapsed ? <span className="menu-name">{menuItem.func_name}</span> : null}
                            </span>
                        }
                    >
                        {(menuItem.children || []).map((childItem: any) => {
                            // 如果is_access_fun的值为或者 当前项目的标识与url _smp参数不一致也需要跳转
                            const isHref = +childItem.is_access_fun === 1;
                            const isOldSite = /\/static\/|\/pact\/|\/fed\//.test(childItem.func_url);
                            const navClass = '';
                            const key = childItem.func_code;

                            let count: number | string = 0;
                            if (childItem.func_code === 'EstablishWorkflowApproval') {
                                const totalNotApproved = workflow.total_not_approved || 0;
                                const totalWithdraw = workflow.total_withdraw || 0;
                                count = totalNotApproved + totalWithdraw;
                            }
                            if (childItem.func_code === 'WorkflowApproval') {
                                count = workflow.total_todo || 0;
                            }

                            let url = childItem.func_url || '';
                            // 后台返回的菜单栏地址截取掉。便于前端路由做判断
                            if (/rental\d?-ykj-test/.test(location.host)) {
                                url = url.replace(/(https?\:\/\/)rental\d?-ykj-test[^\/]+\//, `$1${location.host}/`);
                            }
                            return (
                                <Menu.Item key={key} className={navClass}>
                                    {!isHref && !isOldSite ? (
                                        <Link to={childItem.func_url}>
                                            {childItem.func_name}
                                            {count ? (
                                                <Badge count={count} overflowCount={99} style={{ marginLeft: '5px' }} />
                                            ) : null}
                                        </Link>
                                    ) : (
                                        <a href={url}>
                                            {/* 新站点使用langs.text会产生乱码？ */}
                                            {childItem.func_name}
                                            {count ? (
                                                <Badge count={count} overflowCount={99} style={{ marginLeft: '5px' }} />
                                            ) : null}
                                        </a>
                                    )}
                                </Menu.Item>
                            );
                        })}
                    </SubMenu>
                ))}
            </Menu>
        );
    }

    // 点击子菜单的选择样式
    changeMenuItem(item: any) {
        const openKeys = (item.keyPath || []).filter((key: string) => key !== item.key).reverse();
        this.setState({ selectedKey: item.key, inlineOpenKeys: openKeys, verticalOpenKeys: openKeys });
    }

    // 点击一级菜单的展开样式
    changeSub(openKeys: string[]) {
        const { collapsed } = this.props;
        const obj: any = collapsed ? { inlineOpenKeys: openKeys } : { verticalOpenKeys: openKeys };
        this.setState(obj);
    }
}
