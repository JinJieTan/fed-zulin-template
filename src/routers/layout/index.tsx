import React from 'react';
import queryString from 'query-string';
import { Layout as AntLayout } from 'antd';
import FedHeader from './components/FedHeader';
import FedMenu from './components/FedMenu';
import BizLoading from './components/BizLoading';
import CollapseItem from './components/CollapseItem';
import Logo from './components/Logo';
import { __canvasWM } from '../../helper/watermark';
import { watchUA } from '@/helper/commonUtils';
import * as H from 'history';
import FedCenterLoading from '@c/FedCenterLoading';
import { UserService, UserEntity, UserEntityMethod } from '@/routers/layout/domain/application';
import './index.less';

const { Header, Sider, Content, Footer } = AntLayout;
interface dispatchArg {
    type: string;
    data: any;
}
interface Props {
    children: React.ReactNode;
    dispatch(data: dispatchArg): void;
    location: any;
}
interface State {
    /**
     * 是否已经获取用户信息
     */
    inited: boolean;
    /**
     * 菜单是否折叠
     */
    collapsed: boolean;
    /**
     * 是否是只显示内容
     */
    is_pured: boolean;
    /**
     * 用户信息
     */
    userInfo: UserEntity;
}
const UA = watchUA();
class Layout extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const query = queryString.parse(window.location.search);
        this.state = {
            inited: false,
            collapsed: false,
            is_pured: this.hasIsPured(query),
            userInfo: UserEntityMethod.getEmptyUserInfo(),
        };
    }

    componentDidMount() {
        this.getBaseInfo();
    }
    public render() {
        const { children, location } = this.props;
        const { inited, collapsed, is_pured, userInfo } = this.state;
        const { currentAppInfo } = userInfo;
        return (
            <AntLayout
                style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}
                className={`micro-main ${is_pured ? 'pured' : ''}`}
            >
                {!is_pured ? (
                    <Sider
                        style={{ minHeight: '100vh', maxHeight: '100vh' }}
                        trigger={<CollapseItem collapsed={collapsed} />}
                        collapsible
                        collapsed={collapsed}
                        onCollapse={this.onCollapse}
                        width="184"
                    >
                        <Logo collapsed={collapsed} logoInfo={currentAppInfo.logo_info} />
                        <div
                            style={{ maxHeight: 'calc(100vh - 104px)', overflowY: 'scroll' }} // 56 + 48
                            className="hide-scrollbar"
                        >
                            <FedMenu
                                pathname={location?.pathname}
                                collapsed={collapsed}
                                menuList={userInfo.currentAppMenuList}
                                workflow={userInfo.workflowToDoStats}
                            />
                        </div>
                    </Sider>
                ) : null}
                <AntLayout>
                    {!is_pured ? (
                        <Header className="micro-main-header">
                            <FedHeader
                                whWorkflowToDoStats={userInfo.whWorkflowToDoStats}
                                appList={userInfo.appList}
                                currentAppInfo={currentAppInfo}
                                accountInfo={userInfo.accountInfo}
                            />
                        </Header>
                    ) : null}
                    <Content
                        style={
                            is_pured
                                ? {}
                                : {
                                      overflowX: 'auto',
                                      overflowY: 'hidden',
                                      maxHeight: UA ? 'calc(100vh - 160px)' : 'calc(100vh - 90px)',
                                  }
                        }
                        className="main-content"
                    >
                        {/* 1080px - 200px(/80px) = 880(/1000px) */}
                        <div style={{ minWidth: `${collapsed ? '1000px' : '896px'}`, height: '100%' }}>
                            {inited ? children : <FedCenterLoading />}
                        </div>
                        {/* <BizLoading /> */}
                    </Content>
                    {!is_pured ? (
                        // <Footer className="main-footer">
                        //     Copyright © {new Date().getFullYear()} 明源云空间 版权所有 鄂ICP备15101856号-1
                        // </Footer>
                        <div style={{ height: 12 }}></div>
                    ) : null}
                </AntLayout>
            </AntLayout>
        );
    }

    // 判断url上是否含有pured参数
    hasIsPured = (query: any) => {
        const val = query?.pured;
        return val === null || val === '' || (val && val.length > 0) || false;
    };

    /**
     * 获取用户信息
     */
    getBaseInfo = async () => {
        const res = await UserService.fetchHomeBaseInfo();
        if (res?.result) {
            this.setState({ inited: true, userInfo: res.userInfo }, () => {
                this.getTodo();
                this.showWatermark();
                this.updateIconInfo();
            });
        }
    };

    /**
     * 获取内部审批流和武汉审批流待办数量
     */
    getTodo = async () => {
        const workflowTodoRes = await UserService.fetchWorkflowTodo();
        const wHWorkflowTodoRes = await UserService.fetchWHWorkflowTodo();
        const { userInfo } = this.state;
        if (workflowTodoRes?.result) {
            userInfo.workflowToDoStats = workflowTodoRes.data.workflow;
        }
        if (wHWorkflowTodoRes?.result) {
            userInfo.whWorkflowToDoStats = wHWorkflowTodoRes.data;
        }
        this.setState({ userInfo: { ...userInfo } });
    };

    /**
     * 菜单折叠和展开状态切换
     * @param collapsed
     */
    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed });
    };

    /**
     * 显示水印
     */
    showWatermark = () => {
        const { userInfo } = this.state;
        const { currentAppInfo, accountInfo } = userInfo;
        const query = queryString.parse(window.location.search);
        // 全局配置开启了水印，同时不是在审批模式下
        if (currentAppInfo.is_enabled_watermark && !this.hasIsPured(query)) {
            __canvasWM({
                content: `${accountInfo.tenant_code || ''} ${accountInfo.account || ''}`,
            });
        }
    };

    /**
     * 更新 icon 信息
     */
    updateIconInfo = () => {
        const { userInfo } = this.state;
        const { currentAppInfo } = userInfo;
        if (currentAppInfo.logo_info.icon) {
            const icon: HTMLLinkElement | null = document.querySelector('#icon');
            if (icon) {
                icon.href = currentAppInfo.logo_info.icon;
            }
        }
        if (currentAppInfo.logo_info.title) {
            // 更新页面 title
            window.document.title = currentAppInfo.logo_info.title;
        }
    };
}
export default Layout;
