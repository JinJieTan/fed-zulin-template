/**
 * Created by cuss on 2016/12/19.
 */

import React from 'react';
import './UserInfo.less';
import { Dropdown, Menu } from 'antd';
import FedIcon from '@c/FedIcon';
import { loginOut } from '@s/app';
import Cookie from '@/MemoryShare/cookie';
import removeCache from '@/helper/removeCache';
import { AppListItem, AccountInfo, CurrentAppInfo } from '../../type';

interface Props {
    accountInfo: AccountInfo;
    currentAppInfo: CurrentAppInfo;
    appList: AppListItem[];
}
export default class UserInfo extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { accountInfo, currentAppInfo, appList } = this.props;
        const renderNavs = (appList || []).filter(item =>
            ['ManagementCenter', 'OperationCenter'].includes(item.app_code)
        );
        const iconStyle = { fontSize: '20px', marginRight: '18px' };
        const overlayClassName = 'header-right-dropdown';
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a className="user-info" href={currentAppInfo.passwordUrl} rel="noopener noreferrer">
                        <FedIcon type="icon-icn_avatar" className="icon-avatar" />
                        <div className="info">
                            <div>{accountInfo.display_name}</div>
                            <span>{accountInfo.tenant_code}</span>
                        </div>
                    </a>
                </Menu.Item>
                <Menu.Divider />
                {renderNavs.map(item => (
                    <Menu.Item key={item.app_code}>
                        <a className="item" href={item.site_url} rel="noopener noreferrer">
                            <FedIcon
                                type={
                                    item.app_code === 'ManagementCenter' ? 'icon-icn_navi_manage' : 'icon-icn_navi_team'
                                }
                                style={iconStyle}
                            />
                            {item.app_name}
                        </a>
                    </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item key="2">
                    <div className="item logout" onClick={this.loginOut}>
                        <FedIcon type="icon-icn_navi_logout" style={iconStyle} />
                        退出登录
                    </div>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown
                className="user-role"
                overlay={menu}
                trigger={['click']}
                placement="bottomLeft"
                overlayClassName={overlayClassName}
            >
                <div>
                    <FedIcon type="icon-icn_avatar" className="icon-avatar" />
                    <FedIcon type="icon-icn_caret" style={{ fontSize: '16px', marginLeft: '4px' }} />
                </div>
            </Dropdown>
        );
    }

    loginOut = () => {
        const { currentAppInfo } = this.props;
        loginOut();
        Cookie.remove('gr_user_id');
        Cookie.remove('RENTALCENTER');
        removeCache();
        window.location.href = currentAppInfo.logoutUrl;
    };
}
