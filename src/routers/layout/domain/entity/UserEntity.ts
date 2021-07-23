import {
    AppListItem,
    CurrentAppInfo,
    TreeMenuListItem,
    AccountInfo,
    BaseInfoData,
    WorkflowToDoStats,
    WhWorkflowToDoStats,
} from '../../type';
import UserEntityMethod from './UserEntityMethod';

/**
 * 用户实体
 */
export default class UserEntity {
    /**
     * 用户 id
     */
    user_id: string;
    /**
     * 用户可用的应用列表
     */
    appList: AppListItem[];
    /**
     * 当前应用信息
     */
    currentAppInfo: CurrentAppInfo;
    /**
     * 当前应用菜单列表
     */
    currentAppMenuList: TreeMenuListItem[];
    /**
     * 账户信息
     */
    accountInfo: AccountInfo;
    /**
     * 用户在租赁审批系统的待办审批数量统计
     */
    workflowToDoStats: WorkflowToDoStats;
    /**
     * 用户在武汉审批中心的待办审批数量统计
     */
    whWorkflowToDoStats: WhWorkflowToDoStats;
    constructor(data: BaseInfoData) {
        // 用户 id
        this.user_id = data.user.user_id || '';
        // 应用列表
        this.appList = data.funcNav.apps || [];
        // 当前应用 code
        const currentAppCode = UserEntityMethod.getCurrentAppCode(
            this.appList,
            window.location,
            data.funcNav.functions
        );
        // 当前应用列表项信息
        const currentApp = UserEntityMethod.getCurrentApp(this.appList, currentAppCode);
        // 当前应用信息
        this.currentAppInfo = {
            app_code: currentAppCode,
            app_name: currentApp?.app_name || '',
            is_enabled_watermark: data.is_enabled_watermark,
            is_enabled_wh_workflow: data.is_enabled_wh_workflow,
            wh_workflow_url: data.wh_workflow_url,
            logo_info: data.logo_info,
            logoutUrl: data.logoutUrl,
            merchantsSiteUrl: data.merchantsSiteUrl,
            passwordUrl: data.passwordUrl,
        };
        // 重置测试环境招商管理菜单地址
        const menuList = UserEntityMethod.resetMerchantsMenuUrlOfTest(
            data.funcNav.functions,
            data.merchantsSiteUrl,
            window.location
        );
        // 获取当前应用菜单列表
        this.currentAppMenuList = UserEntityMethod.getMenuTreeList(menuList);
        // 账户信息
        this.accountInfo = data.user;
        // 用户在租赁审批系统的待办审批数量统计
        this.workflowToDoStats = {
            total_not_approved: 0,
            total_todo: 0,
            total_withdraw: 0,
        };
        // 用户在武汉审批中心的待办审批数量统计
        this.whWorkflowToDoStats = {
            todo_number: 0,
        };
    }
}
