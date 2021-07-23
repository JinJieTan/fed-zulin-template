import React, { Component, MouseEventHandler } from 'react';
import { Modal } from 'antd';
import FedIcon from '@c/FedIcon';
import './RedirectPanel.less';
import { AppListItem, AppCodeIconMapOptions } from '../../type';

interface Props {
    title: string;
    appList: AppListItem[];
    onCancel: MouseEventHandler;
}

export default class RedirectPanel extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    getIconType = (appName: keyof AppCodeIconMapOptions) => {
        const mapObj = {
            Apartment: 'icon-icn_apartment',
            AssetCenter: 'icon-icn_asset',
            ManagementCenter: 'icon-icn_manage',
            ManagementCenterDisabled: 'icon-icn_manage_disabled',
            MemberCenter: 'icon-icn_member',
            OperationCenter: 'icon-icn_operate',
            OperationCenterDisabled: 'icon-icn_operate_disabled',
            PropertyBase: 'icon-icn_property',
            Rental: 'icon-icn_rent',
            FangYi: 'icon-icn_FangYi',
        };
        return mapObj[appName] || 'icon-icn_operate';
    };

    render() {
        const { onCancel, appList = [], title } = this.props;
        const allDisabled = appList.length === 0;
        return (
            <Modal
                className="module-modal"
                footer={null}
                centered
                bodyStyle={{ height: 330 }}
                width="auto"
                visible
                onCancel={onCancel}
            >
                <div className="module-content">
                    <p className="text">
                        {allDisabled ? '暂无权限，如需使用请联系管理员' : `即将离开${title}，请选择跳转模块`}
                    </p>
                    <div className="wrap">
                        {appList.map(item => (
                            <a className="item hvr-float" href={item.site_url}>
                                {item.icon_url ? (
                                    <img src={item.icon_url} alt={item.app_name} className="icon-app" />
                                ) : (
                                    <FedIcon
                                        className="icon-app"
                                        type={this.getIconType(item.app_code as keyof AppCodeIconMapOptions)}
                                    />
                                )}
                                <span className="text">{item.app_name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </Modal>
        );
    }
}
