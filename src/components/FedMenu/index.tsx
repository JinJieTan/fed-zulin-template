import React from 'react';
import Menu from 'antd/es/menu';
import 'antd/es/menu/style/index.css';
import { Link } from 'dva/router';
import FedIcon from '../FedIcon';
import { getKey } from './menuRoutes';
import './index.less';
import {} from '../FedHeader/interface';

interface Props {
    menuList: any[];
    workflow: any;
    logoUrl: string;
    menuMode: 'inline' | 'vertical';
    onMenuModeChange: (val: 'inline' | 'vertical') => void;
}

interface State {
    mode: 'inline' | 'vertical';
    selectedKey: string;
    inlineOpenKeys: string[];
    verticalOpenKeys: string[];
}

const { SubMenu } = Menu;
const defaultLogo =
    'data:image/png;base64,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';
const defaultSmallLogo =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAACHFBMVEUAAAAqjvMli/MljPMljPIki/Irqv8kjPMki/MkjPM5lvOLwvgqjvLN5fz///+y1vorj/I7l/PR5vy12PstkPM/mvTV6f252vsukPNDm/Ta6/2+3PswkfNFnfTd7f3B3vsykvNInvTg7/3F4fwzk/NLn/Tj8P3J4vw2lfNOofTk8f1Ro/Xn8v7S5/w8mPNUpPXq9P7W6f0+mfRYpvXs9f7X6v1aqPXu9v5Cm/RdqfXv9v78/v/A3vvo8/5irPbw9/7E4PtWpfUojfI0lPN9uvfh7/1Jn/Rnrvb0+f6v1fopjvJQovXt9f7k8P1MoPRrsfb2+v7f7v0xkvNpr/acy/mIwPiXyPnm8v5vs/b3+/+MwvgmjPJqsPbp8/5ws/f4+/9eqvXr9f51tvf5/P+83PtbqPV5uPf7/f+kz/o/mfTz+f5fqvb8/f/e7f3y+P5krfaCvfj9/v9/u/fP5vwsj/KKwfj+//9So/V+u/dEnPQ9mPOgzfnD3/uhzfkli/KbyvlXpvWx1vpusvZ8ufeWyPmYyPk1lPPx+P5eqfU6l/OSxfn6/P93t/eDvfjK4/xztfeOw/iHv/idy/ltsvYvkfM4lfPL5PyQxPiZyfmTxvmn0PonjfKVx/nC3/t7ufe93PvI4vx2tvdZp/VxtPdssfZTpPVor/Zgq/ZKn/RHnvTc7P1FnPTY6/1BmvTR5/zO5fzi8P3L4/w3lfOr0vpeyulcAAAACnRSTlMAK4/V8/8GlP29kjUMiAAAAuBJREFUeAGkzMUBAkAMBdG/FkGCu/dfJM4RS959Bjcpl9r+VEtOeCCW5iJM916bm94O3AIYSNICJCG3kIzSQgpqC6lon3W6vfYRvvR9GwwDg9HYzCZT92A2t5vF0jlYre1hs3UNdnt7ORwdg9Ol9HJwjiUIwngpTjq2bdu2bdu2bSfPtvkHPuzVZDqbxezt7zz4qmauq/trD6B4eikW8PYBjK+fQgH/ALiNiaEigcAg4BMcokAgNAzuEh7BLBAZBUJEWzMKxMSCMA5xTALxCWRDYnSSZzIgXJwZBFJSyfK09AwdncwsfJ7sHFmB3DyyOL9AM1JYBJTiEhmB0jKytLyCjFVWVdeYkOHaQkmBunogNOhgGpvIZTSHSgi0tMINbfzYInfTHikq0NFJ93fdCX4jMhXbLSLQ00v39zXq8OkfIJOpg4ICWUMobHEiLLAu4D6GgTAyKiAwNg6UCZyYJssc/4fgVDadz8vlCzROzwBlZpbuz/CEufmF/xmmFSj1dXyBRUCMo3ApgSUdjmVAzEzwj7CyCohRKrAG69znRieaH9oUuMQtoGzT4Z2o3T0dnf0DfIDDI8G/8YCuKEfF5Bh6T5aiANF5KhJIZ3TNOYriC3T0sqLa2oBL0VBuAMIAjtfB9eHY3fZh15qNwhC7DCvDq0wvq4wVIYGV6hmiEDaIJ8yuzTO52DJvWr5nYXn/tNv72goJoAOP3xz0gTlvzqv74UkeZFc7Z0gllIlEILQ/yu3XuIPHXu5NT542A0CrkZVcSnvWC5SB4RPX509fRIcdAkfCIENSfXkIYhS9Ykrrr1tBmPY1xsLypgyEaH7LXNre5Qnsry1UUFxHRwCDEzpjeX+fytuf/YG1vKMChyj/qNjivMIF6dNnLUxWOjUJX74qN1nYZtj0a2k0ZzVG51uIcqOJrdZ3QxVm2/sH/Pyl3Gxjhd870gvUNxyqWx7VTZfqtk9146m+9VXdfKts//8Cp4XTB7vRUO0AAAAASUVORK5CYII=';

const logos = [
    'https://ykj-public-prod.oss-cn-hangzhou.aliyuncs.com/Logo/ykj-logo.png',
    'https://ykj-public-prod.oss-cn-hangzhou.aliyuncs.com/Logo/icon.ico',
];
export default class Menus extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const defaultSelectedKey = getKey(location.pathname).code;
        const defaultOpenKeys = [getKey(location.pathname).key];
        this.changeMode = this.changeMode.bind(this);
        this.changeMenuItem = this.changeMenuItem.bind(this);
        this.changeSub = this.changeSub.bind(this);
        this.state = {
            mode: props.menuMode || 'inline', // 默认的菜单模式
            selectedKey: defaultSelectedKey || '', // 默认的选中菜单栏
            //@ts-ignore
            inlineOpenKeys: defaultOpenKeys || [],
            //@ts-ignore
            verticalOpenKeys: defaultOpenKeys || [],
        };
    }

    render() {
        const { menuList = [], workflow = {}, logoUrl } = this.props;
        const { mode, selectedKey, inlineOpenKeys, verticalOpenKeys } = this.state;
        const isInline = mode === 'inline';
        const logoState = !logos.includes(logoUrl);
        return (
            <div className="fed-menu">
                <div className={logoState ? 'logo-background' : 'logo-background logo-background-default'}>
                    {isInline ? (
                        <img className="logo" src={logoState ? logoUrl : defaultLogo} alt="" />
                    ) : (
                        <img className="logo-small" src={logoState ? logoUrl : defaultSmallLogo} alt="" />
                    )}
                </div>
                <div className="show-item">
                    <Menu
                        mode={mode}
                        theme="dark"
                        onClick={this.changeMenuItem}
                        onOpenChange={this.changeSub}
                        selectedKeys={[selectedKey]}
                        openKeys={isInline ? inlineOpenKeys : verticalOpenKeys}
                    >
                        {(menuList || []).map(menuItem => (
                            <SubMenu
                                key={menuItem.func_code}
                                title={
                                    <span>
                                        <i className={`iconfont ${menuItem.icon}`}>
                                            {menuItem.func_code === 'Index' && workflow.total_todo ? (
                                                <span className="red-dot" />
                                            ) : null}
                                        </i>
                                        {mode === 'inline' ? <span>{menuItem.func_name}</span> : null}
                                    </span>
                                }
                            >
                                {(menuItem.children || []).map((childItem: any) => {
                                    // 如果is_access_fun的值为或者 当前项目的标识与url _smp参数不一致也需要跳转
                                    const isHref = +childItem.is_access_fun === 1;
                                    const isOldSite = /\/static\//.test(childItem.func_url);
                                    const navClass = '';
                                    const key = childItem.func_code;

                                    let count: number | string = 0;
                                    let countClass = '';
                                    if (childItem.func_code === 'EstablishWorkflowApproval') {
                                        const totalNotApproved = workflow.total_not_approved
                                            ? workflow.total_not_approved
                                            : 0;
                                        const totalWithdraw = workflow.total_withdraw ? workflow.total_withdraw : 0;
                                        count = totalNotApproved + totalWithdraw;
                                    }
                                    if (childItem.func_code === 'WorkflowApproval') {
                                        count = workflow.total_todo ? workflow.total_todo : 0;
                                    }
                                    if (count > 0 && count < 10) {
                                        countClass = 'circle';
                                    } else if (count >= 10) {
                                        countClass = 'oval';
                                        if (count >= 100) {
                                            count = '99+';
                                        }
                                    }

                                    const url = (childItem.func_url || '')
                                        .replace('https://rental-ykj-test.myfuwu.com.cn/fed', '')
                                        .replace('https://rental-ykj-test.myfuwu.com.cn', '');
                                    // 后台返回的菜单栏地址截取掉。便于前端路由做判断
                                    return (
                                        <Menu.Item key={key} className={navClass}>
                                            <a href={url}>
                                                {/* 新站点使用langs.text会产生乱码？ */}
                                                {childItem.func_name}
                                                {count > 0 && <span className={`badge ${countClass}`}>{count}</span>}
                                            </a>
                                        </Menu.Item>
                                    );
                                })}
                            </SubMenu>
                        ))}
                    </Menu>
                </div>
                <div className={isInline ? 'menu-footer-btn menu-footer' : 'menu-footer-btn menu-footer-change'}>
                    <FedIcon
                        onClick={this.changeMode.bind(this)}
                        className="iconfont icon-folder can-click"
                        type={isInline ? 'icn_nav_fold' : 'icn_nav_spread'}
                    />
                </div>
            </div>
            // </div>
        );
    }

    /* eslint-disable */
    // 改变菜单栏的模式,emitter到header中
    changeMode() {
        const { mode } = this.state;
        const val = mode === 'inline' ? 'vertical' : 'inline';
        const obj: any = val === 'inline' ? {} : { verticalOpenKeys: [] };
        this.setState({ mode: val, ...obj });
        const { onMenuModeChange } = this.props;
        onMenuModeChange && onMenuModeChange(val);
    }

    // 点击子菜单的选择样式
    changeMenuItem(item: any) {
        const openKeys = (item.keyPath || []).filter((key: string) => key !== item.key).reverse();
        this.setState({ selectedKey: item.key, inlineOpenKeys: openKeys, verticalOpenKeys: openKeys });
    }

    // 点击一级菜单的展开样式
    changeSub(openKeys: string[]) {
        const { mode } = this.state;
        const obj: any = mode === 'inline' ? { inlineOpenKeys: openKeys } : { verticalOpenKeys: openKeys };
        this.setState(obj);
    }
}