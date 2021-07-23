import React from 'react';
import qs from 'querystring';
import './index.less';
import UserInfo from './UserInfo';
import FedIcon from '@c/FedIcon';
import RedirectPanel from './RedirectPanel';
import procedureImg from './images/icon_procedure.svg';
import { Badge, Space } from 'antd';
import { UserEntityMethod } from '@/routers/layout/domain/application';
import { AppListItem, AccountInfo, WhWorkflowToDoStats, CurrentAppInfo } from '../../type';

export interface Props {
    appList: AppListItem[];
    accountInfo: AccountInfo;
    currentAppInfo: CurrentAppInfo;
    whWorkflowToDoStats: WhWorkflowToDoStats;
}
interface State {
    showModule: boolean;
}

export default class FedHeader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showModule: false,
        };
    }

    render() {
        const { showModule } = this.state;
        const { appList, accountInfo, currentAppInfo, whWorkflowToDoStats } = this.props;
        const outAppList = UserEntityMethod.getOuterAppList(appList);
        const whTodoNumber = whWorkflowToDoStats?.todo_number || 0;
        const whWorkflowUrl = UserEntityMethod.getWhWorkflowUrl(accountInfo, currentAppInfo);
        return (
            <>
                <div className="micro-fed-header-content">
                    <div className="micro-fed-header-content-left" onClick={() => this.onOpenModal(outAppList.length)}>
                        <span className="title">{currentAppInfo.app_name}</span>
                        {outAppList.length > 0 ? <FedIcon type="icon-switch" className="icon-switch" /> : null}
                    </div>
                    <div className="micro-fed-header-content-right">
                        {currentAppInfo.is_enabled_wh_workflow ? (
                            <a href={whWorkflowUrl} target="_blank">
                                <Badge count={whTodoNumber}>
                                    <img
                                        src={procedureImg}
                                        alt="进入流程中心"
                                        title="进入流程中心"
                                        style={{ width: '24px', cursor: 'pointer' }}
                                    />
                                </Badge>
                            </a>
                        ) : null}
                        <UserInfo accountInfo={accountInfo} currentAppInfo={currentAppInfo} appList={appList} />
                    </div>
                </div>
                {showModule ? (
                    <RedirectPanel
                        onCancel={() => this.onCloseModal()}
                        appList={outAppList}
                        title={currentAppInfo.app_name}
                    />
                ) : null}
            </>
        );
    }

    onOpenModal = (appLength: number) => {
        if (appLength === 0) {
            return false;
        }
        this.setState({ showModule: true });
    };

    onCloseModal = () => {
        this.setState({ showModule: false });
    };
}
