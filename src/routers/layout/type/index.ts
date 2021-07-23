/**
 * 应用列表项信息
 */
export interface AppListItem {
    /**
     * 应用 code
     */
    app_code: string;
    /**
     * 应用名称
     */
    app_name: string;
    /**
     * 是否为当前应用
     */
    className: string;
    /**
     * 应用链接
     */
    site_url: string;
    /**
     * icon 链接
     */
    icon_url?: string;
}

/**
 * 界面操作项权限信息
 */
export interface actionItem {
    /**
     * 前端权限名称，用于控制前端操作的权限
     */
    element_id: string;
    /**
     * 所属菜单 code
     */
    func_code: string;
}

/**
 * logo 信息
 */
export interface LogoInfo {
    /**
     * 小的 logo 的链接，
     */
    icon: string;
    /**
     * 大的 logo 的链接，
     */
    logo: string;
    /**
     * 公司名称，用于网页的 title
     */
    title: string;
}

/**
 * 当前应用信息
 */
export interface CurrentAppInfo {
    /**
     * 应用 code
     */
    app_code: string;
    /**
     * 应用名称
     */
    app_name: string;
    /**
     * 是否开启全局水印
     */
    is_enabled_watermark: boolean;
    /**
     * 是否开启武汉审批
     */
    is_enabled_wh_workflow: boolean;
    /**
     * 武汉审批的链接
     */
    wh_workflow_url: string;
    /**
     * logo 信息
     */
    logo_info: LogoInfo;
    /**
     * 退出之后跳转的链接
     */
    logoutUrl: string;
    /**
     * 招商管理的链接
     */
    merchantsSiteUrl: string;
    /**
     * 修改账号信息的链接
     */
    passwordUrl: string;
}

/**
 * 菜单权限列表项
 */
export interface MenuListItem {
    /**
     * 操作权限列表
     */
    actions: actionItem[];
    /**
     * 菜单 code
     */
    func_code: string;
    /**
     * 菜单名称
     */
    func_name: string;
    /**
     * 菜单链接
     */
    func_url: string;
    /**
     * icon 名称
     */
    icon: string;
    /**
     * 菜单 code
     */
    id: string;
    /**
     * 是否为外部链接
     */
    is_access_fun: 0 | 1;
    /**
     * 当前菜单是否有链接
     */
    is_link: 0 | 1;
    /**
     * 层级
     */
    level: number;
    /**
     * 父级菜单 code
     */
    parent_id: string;
}

/**
 * 树状菜单权限列表项
 */
export interface TreeMenuListItem extends MenuListItem {
    children: TreeMenuListItem[];
}

/**
 * 账号信息
 */
export interface AccountInfo {
    /**
     * 账号用户名
     */
    account: string;
    /**
     * 用户名称
     */
    display_name: string;
    /**
     * 组织 id
     */
    org_id: string;
    /**
     * 企业代码
     */
    tenant_code: string;
    /**
     * 账号 id
     */
    user_id: string;
}

/**
 * 接口 home/base-info 返回的数据结构
 */
export interface BaseInfoData {
    funcNav: {
        apps: AppListItem[];
        functions: MenuListItem[];
    };
    is_enabled_watermark: boolean;
    is_enabled_wh_workflow: boolean;
    logo_info: LogoInfo;
    logoutUrl: string;
    merchantsSiteUrl: string;
    passwordUrl: string;
    user: AccountInfo;
    wh_workflow_url: string;
}

/**
 * 内部审批（租赁系统自己开发的审批工具）统计数据
 */
export interface WorkflowToDoStats {
    /**
     * 自己发起的未通过的审批数量
     */
    total_not_approved: number;
    /**
     * 办理中的审批数量
     */
    total_todo: number;
    /**
     * 自己发起的驳回的审批数量
     */
    total_withdraw: number;
}

/**
 * 武汉审批统计数据
 */
export interface WhWorkflowToDoStats {
    /**
     * 武汉审批待处理的数量
     */
    todo_number: number;
}

/**
 * 应用 code 对应的 icon
 */
export interface AppCodeIconMapOptions {
    Apartment: string;
    AssetCenter: string;
    ManagementCenter: string;
    ManagementCenterDisabled: string;
    MemberCenter: string;
    OperationCenter: string;
    OperationCenterDisabled: string;
    PropertyBase: string;
    Rental: string;
    FangYi: string;
}
