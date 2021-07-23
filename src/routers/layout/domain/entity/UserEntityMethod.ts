import queryString from 'query-string';
import {
    AccountInfo,
    CurrentAppInfo,
    AppListItem,
    MenuListItem,
    TreeMenuListItem,
    WorkflowToDoStats,
} from '../../type';
import config from '@/config';
import UserEntity from './UserEntity';
import _ from 'lodash';
export default class UserEntityMethod {
    /**
     * 生成空的用户信息
     * @returns
     */
    static getEmptyUserInfo(): UserEntity {
        return {
            user_id: '',
            appList: [],
            currentAppInfo: {
                app_code: '',
                app_name: '',
                is_enabled_watermark: false,
                is_enabled_wh_workflow: false,
                wh_workflow_url: '',
                logo_info: {
                    icon: '',
                    logo: '',
                    title: '',
                },
                logoutUrl: '',
                merchantsSiteUrl: '',
                passwordUrl: '',
            },
            currentAppMenuList: [],
            accountInfo: {
                account: '',
                display_name: '',
                org_id: '',
                tenant_code: '',
                user_id: '',
            },
            workflowToDoStats: {
                total_not_approved: 0,
                total_todo: 0,
                total_withdraw: 0,
            },
            whWorkflowToDoStats: {
                todo_number: 0,
            },
        };
    }
    /**
     * 获取当前应用的 code
     * @param appList 应用列表
     * @param location
     * @param menuList 菜单列表
     * @returns
     */
    static getCurrentAppCode(appList: AppListItem[], location: Location, menuList?: MenuListItem[]): string {
        // 应用列表里面有标志，则通过标志判断
        const find = appList.find(item => item.className === 'on');
        if (find) {
            return find.app_code;
        }

        // 通过接口返回的菜单链接获取或通过当前页面的链接获取
        let queryStr = location.search;
        if (menuList) {
            const treeMenuList: TreeMenuListItem[] = menuList.map(item => ({ ...item, children: [] }));
            const menu = UserEntityMethod.getActiveMenu(treeMenuList, location.pathname) || {};
            const menuItem = menuList.find(item => item.func_code === menu.code);
            if (menuItem && menuItem.func_url) {
                queryStr = menuItem.func_url.replace(/.*\?/, '');
            }
        }
        const query = queryString.parse(queryStr);
        const smp = ((query._smp as string | undefined) || '').split('.')[0];
        return smp || 'Rental';
    }

    /**
     * 获取应用列表项
     * @param appList 应用列表
     * @param appCode 应用 code
     * @returns
     */
    static getCurrentApp(appList: AppListItem[], appCode: string) {
        const find = appList.find(item => item.app_code === appCode);
        return find;
    }

    /**
     * 获取武汉跳转链接
     * @param accountInfo 账号信息
     * @param currentAppInfo 当前应用信息
     * @returns
     */
    static getWhWorkflowUrl(accountInfo: AccountInfo, currentAppInfo: CurrentAppInfo) {
        const params = {
            app_code: currentAppInfo.app_code,
            tenant_code: accountInfo.tenant_code,
            user_id: accountInfo.user_id,
            user_name: accountInfo.account,
            client_type: 'pc',
        };
        let apiHostName: string = '';
        // 后端返回了武汉审批工作流地址，则直接使用该域名
        if (currentAppInfo.wh_workflow_url) {
            apiHostName = currentAppInfo.wh_workflow_url;
        } else {
            const host = window.location.host;
            apiHostName = host.search(/test/) !== -1 ? 'https://flow.test.myspacex.cn' : 'https://flow.myfuwu.com.cn';
        }
        return `${apiHostName}/workflow/handle-list?${queryString.stringify(params)}`;
    }

    /**
     * 获取审批菜单的待办数量
     * @param menu 菜单信息
     * @param workflowToDoStats 内部审批流数量统计
     * @returns
     */
    static getWorkflowMenuTodoCount(menu: MenuListItem, workflowToDoStats: WorkflowToDoStats): number {
        if (menu.func_code === 'EstablishWorkflowApproval') {
            const totalNotApproved = workflowToDoStats.total_not_approved || 0;
            const totalWithdraw = workflowToDoStats.total_withdraw || 0;
            return totalNotApproved + totalWithdraw;
        }
        if (menu.func_code === 'WorkflowApproval') {
            return workflowToDoStats.total_todo || 0;
        }
        return 0;
    }

    /**
     * 获取外部应用列表（除了租赁中心（Rental）、管理中心（ManagementCenter）、运营中心（OperationCenter））
     * @param appList 应用列表
     * @returns
     */
    static getOuterAppList(appList: AppListItem[]) {
        const excludeAppCodeList = ['Rental', 'ManagementCenter', 'OperationCenter'];
        return (appList || []).filter(item => !excludeAppCodeList.includes(item.app_code));
    }

    /**
     * 获取树状的菜单列表
     * @param menuList 平铺的菜单列表
     * @returns
     */
    static getMenuTreeList(menuList: MenuListItem[]) {
        let menuTreeList: TreeMenuListItem[] = [];
        // 获取父级菜单
        menuTreeList = menuList.filter(menu => +menu.level === 1).map(menu => ({ ...menu, children: [] }));
        // 获取子级菜单
        menuTreeList.forEach(parent => {
            parent.children = menuList
                .filter(menu => menu.parent_id === parent.id)
                .map(menu => ({
                    ...menu,
                    func_url: UserEntityMethod.getMenuUrl(menu),
                    children: [],
                }));
        });
        return menuTreeList;
    }

    /**
     * 获取菜单链接
     * @param menu 菜单
     * @returns
     */
    static getMenuUrl(menu: MenuListItem) {
        let url = menu?.func_url || '';
        const originReg = /^https?:\/\/[^/]*/;
        url = +menu.is_access_fun === 1 ? url : url.replace(originReg, '');
        return url;
    }

    /**
     * 测试环境时，设置正确的招商菜单链接，方便测试点击跳转（要推动后端返回正确的菜单链接）
     * @param menuList 菜单列表
     * @param merchantsSiteUrl 招商链接
     * @param location
     * @returns
     */
    static resetMerchantsMenuUrlOfTest(menuList: MenuListItem[], merchantsSiteUrl: string, location: Location) {
        if (!/test/.test(location.host)) {
            return menuList;
        }
        menuList.forEach(item => {
            if (+item.is_access_fun === 1 && item.func_url.search(merchantsSiteUrl) > -1) {
                const merchantsOrigin = location.origin.replace('rental', 'merchants');
                if (merchantsOrigin !== merchantsSiteUrl) {
                    item.func_url = `${merchantsOrigin}${item.func_url.replace(merchantsSiteUrl, '')}`;
                }
            }
        });
        return menuList;
    }

    /**
     * 获取当前链接对应的菜单，选择逻辑是：选择菜单地址与链接 pathname 重合最多的菜单
     * @param treeMenuList 应用的树状菜单
     * @param pathname 链接的 pathname
     */
    static getActiveMenu(treeMenuList: TreeMenuListItem[], pathname: string) {
        // 处理公共导入的路由高亮
        if (pathname.includes('/public/batch-import')) {
            const dropArr = pathname.split('/');
            pathname = `/${_.takeRight(dropArr, 2).join('/')}`;
        }

        // 把 pathname 转换为匹配列表
        // 例如：/pact/contract/detail/id -> ['/contract/detail/id ', '/contract/detail', '/contract']
        const pathList = pathname.split('/').filter((item, index) => index > 1);
        let matchList: string[] = [];
        // 特殊场景处理, 例如：收据页面高亮票据管理菜单
        const mapList: [string[], string][] = [
            // 收据 -> 票据管理
            [['receipt'], 'invoice'],
            // 户型管理、合同意向书模板、打印模板 -> 基础数据
            [['apartment', 'template', 'print'], 'basicdata'],
            // 押金账单、定金账单、预存金账单、记账、核销 -> 账单管理
            [['foregift', 'earnest', 'prestore', 'tally', 'settle'], 'billing'],
            // 品牌落位图 -> 租控管理
            [['brandplan'], 'status'],
            // '资产档案' -> '房间管理'
            [['archives'], 'room'],
        ];
        mapList.map(item => {
            if (item[0].includes(pathList[0])) {
                pathList.unshift(item[1]);
            }
        });
        pathList.forEach((item, index) => {
            matchList[index] = `${index === 0 ? '' : matchList[index - 1]}/${item}`;
        });
        matchList = matchList.reverse();

        // 匹配菜单，匹配逻辑是：pathIndex 越小，就表明越匹配
        let activeMenu = { parent_code: '', code: '' };
        let pathIndex = matchList.length;
        const loop = (item: TreeMenuListItem) => {
            if (item.children?.length) {
                item.children.forEach(loop);
            } else if (item.func_url) {
                const url = item.func_url;
                matchList.forEach((path, index) => {
                    // 匹配时，应该以 ? 或 / 结尾才有效，防止类似 /meter 匹配上菜单 /metermg 的情况
                    const reg = new RegExp(`${path}[?/]`);
                    if (pathIndex >= index && url.search(reg) > -1) {
                        pathIndex = index;
                        activeMenu = { parent_code: item.parent_id, code: item.func_code };
                    }
                });
            }
        };
        treeMenuList.forEach(loop);
        return activeMenu;
    }
}
