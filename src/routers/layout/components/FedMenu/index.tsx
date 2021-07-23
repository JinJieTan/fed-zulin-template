import React from 'react';
import { Badge, Menu } from 'antd';
import { Link } from 'dva/router';
import FedIcon from '@c/FedIcon';
import { TreeMenuListItem, WorkflowToDoStats } from '../../type';
import { UserEntityMethod } from '@/routers/layout/domain/application';
import './index.less';

interface Props {
    collapsed: boolean;
    menuList: TreeMenuListItem[];
    workflow: WorkflowToDoStats;
    pathname: string;
}

interface State {
    selectedKey: string;
    inlineOpenKeys: string[];
    verticalOpenKeys: string[];
}

const { SubMenu } = Menu;

const getSelectedMenuInfo = (menuList: TreeMenuListItem[], pathname: string): State => {
    const path = pathname || '';
    const menu = UserEntityMethod.getActiveMenu(menuList, path);
    const defaultSelectedKey = menu.code;
    const defaultOpenKeys = [menu.parent_code];
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
        this.state = getSelectedMenuInfo(props.menuList, props.pathname);
    }

    componentDidUpdate(prevProps: Props) {
        const { menuList, pathname } = this.props;
        if (pathname !== prevProps.pathname || menuList !== prevProps.menuList) {
            this.setState(getSelectedMenuInfo(menuList, pathname));
        }
    }

    render() {
        const { menuList, workflow, collapsed } = this.props;
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
                                <Badge dot={menuItem.func_code === 'Approval' && !!workflow.total_todo}>
                                    <FedIcon style={{ marginRight: 0 }} type={menuItem.icon} />
                                </Badge>
                                {!collapsed ? <span className="menu-name">{menuItem.func_name}</span> : null}
                            </span>
                        }
                    >
                        {(menuItem.children || []).map(childItem => {
                            // 如果is_access_fun的值为或者 当前项目的标识与url _smp参数不一致也需要跳转
                            const isHref = +childItem.is_access_fun === 1;
                            let count = UserEntityMethod.getWorkflowMenuTodoCount(childItem, workflow);
                            const countBadge = count ? (
                                <Badge count={count} overflowCount={99} style={{ marginLeft: '5px' }} />
                            ) : null;
                            return (
                                <Menu.Item key={childItem.func_code}>
                                    {!isHref ? (
                                        <Link to={childItem.func_url}>
                                            {childItem.func_name}
                                            {countBadge}
                                        </Link>
                                    ) : (
                                        <a href={childItem.func_url}>
                                            {/* 新站点使用langs.text会产生乱码？ */}
                                            {childItem.func_name}
                                            {countBadge}
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
