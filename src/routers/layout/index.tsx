import React, { ReactElement } from 'react';
// @ts-ignore
// import myWebLogTracker from 'fast-tracker';
// @ts-ignore
import * as queryString from 'query-string';
import { Layout as AntLayout, message, Spin } from 'antd';
import FedHeader from './components/FedHeader';
import FedMenu from './components/FedMenu';
import BizLoading from './components/BizLoading';
import CollapseItem from './components/CollapseItem';
import Logo from './components/Logo';
import { getHomeBaseInfo, getWorkflowTodo, getWHWorkflowTodo } from '@s/app';
import { find } from 'lodash';
// import { __canvasWM } from '../../helper/watermark';
import config from '../../config';
import { handleBaseInfo } from '../../helper/handleBaseInfo';
import { AppInfo, User, whWorkFlowInfo } from './components/FedHeader/interface';
import { watchUA } from '@/helper/commonUtils';
import * as H from 'history';
import FedCenterLoading from '@c/FedCenterLoading';

import './index.less';
import { connect } from 'dva';

const { Header, Sider, Content, Footer } = AntLayout;

const { DEV } = config;
interface dispatchArg {
    type: string;
    data: any;
}
interface Props {
    children: React.ReactNode;
    dispatch(data: dispatchArg): void;
    location: H.Location;
}

interface LogoInfo {
    icon: string;
    logo: string;
    title: string;
}
interface State {
    inited: boolean;
    collapsed: boolean;
    appList: AppInfo[];
    user: User;
    passwordUrl: string;
    logoutUrl: string;
    logoInfo: LogoInfo;
    workflow: object;
    appCode: string;
    is_enabled_wh_workflow: boolean;
    is_pured: boolean;
    whWorkFlowInfo: whWorkFlowInfo;
    wh_workflow_url: string;
}
const UA = watchUA();
class Layout extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const query = queryString.parse((location as any).search);
        this.state = {
            inited: false,
            collapsed: false,
            appList: [],
            user: {
                account: '',
                displayName: '',
                display_name: '',
                key: '',
                org_id: '',
                organ_name: '',
                tenantCode: '',
                tenant_code: '',
                tenant_name: '',
                user_id: '',
            },
            passwordUrl: '',
            logoutUrl: '',
            logoInfo: {
                icon: '',
                logo: '',
                title: '',
            },
            workflow: {},
            appCode: '',
            is_enabled_wh_workflow: false,
            wh_workflow_url: '',
            is_pured: this.hasIsPured(query),
            whWorkFlowInfo: {
                todo_number: 0,
            },
        };
        this.props.dispatch({ type: 'main/initBaseInfo', data: Object.assign({}, this.state) });
    }

    async componentDidMount() {
        await this.getBaseInfo();
    }
    public render() {
        const { children, location } = this.props;
        const {
            inited,
            collapsed,
            logoInfo,
            appList = [],
            is_enabled_wh_workflow,
            wh_workflow_url,
            whWorkFlowInfo,
            workflow,
            user,
            passwordUrl,
            logoutUrl,
            appCode,
            is_pured,
        } = this.state;
        const nav = find(appList, ['key', appCode]);
        return (
            <AntLayout
                style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}
                className={`main ${is_pured ? 'pured' : ''}`}
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
                        <Logo collapsed={collapsed} logoInfo={logoInfo} />
                        <div
                            style={{ maxHeight: 'calc(100vh - 104px)', overflowY: 'scroll' }} // 56 + 48
                            className="hide-scrollbar"
                        >
                            <FedMenu
                                pathname={location?.pathname}
                                collapsed={collapsed}
                                menuList={(nav && nav.children) || []}
                                workflow={workflow}
                            />
                        </div>
                    </Sider>
                ) : null}
                <AntLayout>
                    {!is_pured ? (
                        <Header className="main-header">
                            <FedHeader
                                is_enabled_wh_workflow={is_enabled_wh_workflow}
                                wh_workflow_url={wh_workflow_url}
                                whWorkFlowInfo={whWorkFlowInfo}
                                appList={appList}
                                appCode={appCode}
                                user={user}
                                logoutUrl={logoutUrl}
                                personalCenterUrl={passwordUrl}
                            />
                        </Header>
                    ) : null}
                    <Content
                        style={{
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            maxHeight: UA ? 'calc(100vh - 160px)' : 'calc(100vh - 90px)',
                        }}
                        className="main-content"
                        id="antContentArea"
                    >
                        {/* 1080px - 200px(/80px) = 880(/1000px) */}
                        <div style={{ minWidth: `${collapsed ? '1000px' : '896px'}`, height: '100%' }}>
                            {inited ? children : <FedCenterLoading />}
                        </div>
                        <BizLoading />
                    </Content>
                    {!is_pured ? (
                        <Footer className="main-footer">
                            Copyright © {new Date().getFullYear()} 明源云空间 版权所有 鄂ICP备15101856号-1
                        </Footer>
                    ) : null}
                </AntLayout>
            </AntLayout>
        );
    }

    // // 注册天眼
    // initTracker = (user: User) => {
    //     const trackerInstance = myWebLogTracker({
    //         app_code: 'rental_web',
    //         product_code: location.href.indexOf('https://rental.myfuwu.com.cn') > -1 ? 'rental' : 'rental_test',
    //         include_search: true, // 上报search参数
    //     });
    //     trackerInstance.registUser({ tenant_code: user.tenant_code, user_account: user.account });
    // };

    // 判断url上是否含有pured参数
    hasIsPured = (query: any) => {
        const val = query?.pured;
        return val === null || val === '' || (val && val.length > 0) || false;
    };

    getBaseInfo = async () => {
        const query = queryString.parse((location as any).search);
        const smp = (query._smp || '').split('.')[0];
        query._smp = smp;
        const { data } = await getHomeBaseInfo(query);

        // // 增加水印
        // if (data?.is_enabled_watermark) {
        //     __canvasWM({
        //         content: `${data?.user?.tenant_code || ''} ${data?.user?.account || ''}`,
        //     });
        // }

        const props: any = handleBaseInfo(data);
        this.setState({ ...props, inited: true, is_enabled_wh_workflow: data.is_enabled_wh_workflow });
        // 将全局基本信息放入到store中, 其它地方可能用到
        this.props.dispatch({
            type: 'main/initBaseInfo',
            data: props,
        });
        // this.initTracker(props.user);
        const { data: workflowData } = await getWorkflowTodo();
        let { data: whWorkFlowInfo } = await getWHWorkflowTodo();
        this.setState({ ...workflowData, whWorkFlowInfo }, () => {
            this.props.dispatch({ type: 'main/initBaseInfo', data: Object.assign({}, this.state) });
        });
    };

    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed }, () => {
            this.props.dispatch({ type: 'main/initBaseInfo', data: Object.assign({}, this.state) });
        });
    };
}
export default Layout;
