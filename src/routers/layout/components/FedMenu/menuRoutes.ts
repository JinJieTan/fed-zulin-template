/**
 * 由于菜单只能匹配一个地址，但某些菜单下的子页面可能是在内页中跳转，可能使用当前菜单无法高亮，这里另作配置，详见PageMenu.jsx实现
 *
 */
interface MenuRoutes {
    /**
     * 匹配前端路由的正则字符串
     */
    reg: string;
    /**
     * 一级菜单 code
     */
    parent_code: string;
    /**
     * 二级菜单 code
     */
    code: string;
    /**
     * 路由对应菜单名称
     */
    name: string;
}
export const maps: MenuRoutes[] = [
    /**
     * parent_code，菜单地址（不需把bastPath，以及它的查询参数写上，在PageMenu中会处理），value，正则表达式，用来匹配页面路由地址
     */
    /**
     * 首页(index)
     */
    { reg: '/middleground/workspace.*', parent_code: 'Index', code: 'Workbench', name: '工作台' },
    /**
     * 统计分析(Statistical)
     */
    { reg: '/static/assetmap.*', parent_code: 'Statistical', code: 'ResourceMap', name: '资产地图' },
    { reg: '/middleground/report.*', parent_code: 'Statistical', code: 'Report', name: '统计报表' },
    { reg: '/static/dashboard.*', parent_code: 'Statistical', code: 'Dashboard', name: '仪表盘' },
    /**
     * 审批流程(Approval)
     */
    { reg: '/static/workflowApproval.*', parent_code: 'Approval', code: 'WorkflowApproval', name: '办理的流程' },
    {
        reg: '/static/establishWorkflowApproval.*',
        parent_code: 'Approval',
        code: 'EstablishWorkflowApproval',
        name: '发起的流程',
    },
    { reg: '/static/workflowManage.*', parent_code: 'Approval', code: 'WorkflowManage', name: '流程管理' },
    /**
     * 资源管理(Resource)
     */
    { reg: '/middleground/repay.*', parent_code: 'Resource', code: 'Stage', name: '项目管理' },
    { reg: '/middleground/bizUnit.*', parent_code: 'Resource', code: 'OperationUnit', name: '经营单元' },
    { reg: '/middleground/room.*', parent_code: 'Resource', code: 'Room', name: '资源台账' },
    { reg: '/static/room.*', parent_code: 'Resource', code: 'Room', name: '资源台账' },
    { reg: '/static/archives.*', parent_code: 'Resource', code: 'Room', name: '资产档案' },
    { reg: '/static/status.*', parent_code: 'Resource', code: 'RoomStatus', name: '租控管理' },
    { reg: '/middleground/lockManagement.*', parent_code: 'Resource', code: 'SafeGuard', name: '锁定管理' },
    /**
     * 招商管理(Group)
     */
    { reg: '/static/merchantNew.*', parent_code: 'Group', code: 'MerchantAdminNew', name: '商机分配' },
    { reg: '/static/merchant.*', parent_code: 'Group', code: 'MerchantAdminNew', name: '商机分配' },
    { reg: '/static/customers-ledger.*', parent_code: 'Group', code: 'CustomersLedger', name: '客商台账' },
    { reg: '/static/customers.*', parent_code: 'Group', code: 'RenterNew', name: '跟客管理' },
    { reg: '/static/priceStrategy.*', parent_code: 'Group', code: 'PriceStrategy', name: '底价策略' },
    { reg: '/static/brandplan.*', parent_code: 'Group', code: 'BrandPlan', name: '品牌规划' },
    { reg: '/static/brand.*', parent_code: 'Group', code: 'Brand', name: '品牌管理' },
    { reg: '/static/merchants-group.*', parent_code: 'Group', code: 'MerchantsGroup', name: '团队管理' },
    { reg: '/static/enquiry.*', parent_code: 'Group', code: 'Enquiry', name: '问询管理' },
    { reg: '/fed/clues.*', parent_code: 'Group', code: 'MerchantClue', name: '招商线索' },
    /**
     * 租赁合同(ContractManage)
     */
    { reg: '/pact/contract/add.*', parent_code: 'ContractManage', code: 'ContractAdd', name: '新签合同' },
    { reg: '/pact/intent/add.*', parent_code: 'ContractManage', code: 'IntentAdd', name: '新签意向书' },
    { reg: '/pact/contract/.*', parent_code: 'ContractManage', code: 'Contract', name: '合同列表' },
    { reg: '/middleground/contract.*', parent_code: 'ContractManage', code: 'Contract', name: '合同列表' },
    { reg: '/pact/intent.*', parent_code: 'ContractManage', code: 'Intent', name: '意向书列表' },
    { reg: '/static/intent.*', parent_code: 'ContractManage', code: 'Intent', name: '意向书列表' },
    { reg: '/static/change.*', parent_code: 'ContractManage', code: 'ContractChange', name: '合同变更' },
    { reg: '/pact/change.*', parent_code: 'ContractManage', code: 'ContractChange', name: '合同变更' },
    { reg: '/middleground/policy.*', parent_code: 'ContractManage', code: 'RentPolicy', name: '租赁政策' },
    /**
     * 运营管理(LeaseManage)
     */
    { reg: '/middleground/checkin.*', parent_code: 'LeaseManage', code: 'CheckIn', name: '入驻办理' },
    { reg: '/static/checkin.*', parent_code: 'LeaseManage', code: 'CheckIn', name: '入驻办理' },
    { reg: '/middleground/lease/list.*', parent_code: 'LeaseManage', code: 'Relet', name: '续租办理' },
    { reg: '/static/lease.*', parent_code: 'LeaseManage', code: 'Relet', name: '续租办理' },
    { reg: '/pact/contract/lease.*', parent_code: 'LeaseManage', code: 'Relet', name: '续租管理' },
    { reg: '/static/backrent.*', parent_code: 'LeaseManage', code: 'CheckOut', name: '退租办理' },
    { reg: '/static/tenant.*', parent_code: 'LeaseManage', code: 'ManageRenter', name: '租客管理' },
    { reg: '/fed/customer-score.*', parent_code: 'LeaseManage', code: 'Score', name: '客户评分' },
    { reg: '/fed/business-volume.*', parent_code: 'LeaseManage', code: 'Business', name: '营业额管理' },
    {
        reg: '/middleground/renter-customers-service/list.*',
        parent_code: 'LeaseManage',
        code: 'RenterCustomersService',
        name: '租户服务',
    },
    {
        reg: '/static/renter-customers-service.*',
        parent_code: 'LeaseManage',
        code: 'RenterCustomersService',
        name: '租户服务',
    },
    { reg: '/static/meeting-room-order.*', parent_code: 'LeaseManage', code: 'MeetingRoomOrder', name: '会议室订单' },
    { reg: '/static/meeting-room.*', parent_code: 'LeaseManage', code: 'MeetingRoomManage', name: '会议室列表' },
    /**
     * 财务管理(Finance)
     */
    { reg: '/fed/billing.*', parent_code: 'Finance', code: 'Bill', name: '账单管理' },
    { reg: '/static/billing.*', parent_code: 'Finance', code: 'Bill', name: '账单管理' },
    { reg: '/static/foregift.*', parent_code: 'Finance', code: 'Bill', name: '账单管理' },
    { reg: '/static/earnest.*', parent_code: 'Finance', code: 'Bill', name: '账单管理' },
    { reg: '/static/prestore.*', parent_code: 'Finance', code: 'Bill', name: '账单管理' },
    { reg: '/static/tally.*', parent_code: 'Finance', code: 'Bill', name: '账单管理' },
    { reg: '/static/settle.*', parent_code: 'Finance', code: 'Bill', name: '账单管理' },
    { reg: '/fed/bill-reminder.*', parent_code: 'Finance', code: 'BillReminder', name: '账单催款' },
    { reg: '/static/refund.*', parent_code: 'Finance', code: 'Refund', name: '退款管理' },
    { reg: '/static/refund.*', parent_code: 'Finance', code: 'Refund', name: '退款管理' },
    { reg: '/middleground/derate.*', parent_code: 'Finance', code: 'Derate', name: '减免管理' },
    { reg: '/static/derate.*', parent_code: 'Finance', code: 'Derate', name: '减免管理' },
    { reg: '/fed/invoice.*', parent_code: 'Finance', code: 'Receipt', name: '票据管理' },
    { reg: '/fed/receipt.*', parent_code: 'Finance', code: 'Receipt', name: '票据管理' },
    { reg: '/static/outlay.*', parent_code: 'Finance', code: 'Outlay', name: '收支管理' },
    { reg: '/middleground/outlay.*', parent_code: 'Finance', code: 'Outlay', name: '收支管理' },
    { reg: '/fed/voucher.*', parent_code: 'Finance', code: 'VoucherList', name: '凭证管理' },
    { reg: '/middleground/accrual.*', parent_code: 'Finance', code: 'FinanceAccrual', name: '权责管理' },
    { reg: '/static/commission.*', parent_code: 'Finance', code: 'Commission', name: '营业抽成' },
    { reg: '/middleground/sundry.*', parent_code: 'Finance', code: 'Sundry', name: '杂项费用' },
    { reg: '/middleground/basicfee.*', parent_code: 'Finance', code: 'Fee', name: '基本费项' },
    { reg: '/static/deposit.*', parent_code: 'Finance', code: 'Deposit', name: '预存金管理' },

    /**
     * 物业管理(PropertyContract)
     */
    {
        reg: '/pact/property-contract/add.*',
        parent_code: 'PropertyContract',
        code: 'PropertyContractAdd',
        name: '新签物业合同',
    },
    {
        reg: '/static/property-contract/.*',
        parent_code: 'PropertyContract',
        code: 'PropertyContractList',
        name: '物业合同列表',
    },
    {
        reg: '/pact/property-contract/.*',
        parent_code: 'PropertyContract',
        code: 'PropertyContractList',
        name: '物业合同列表',
    },
    {
        reg: '/static/property-change/.*',
        parent_code: 'PropertyContract',
        code: 'PropertyContractChange',
        name: '物业变更',
    },
    {
        reg: '/pact/property-change/.*',
        parent_code: 'PropertyContract',
        code: 'PropertyContractChange',
        name: '物业变更',
    },
    { reg: '/static/meter.*', parent_code: 'PropertyContract', code: 'Meter', name: '抄表管理' },
    { reg: '/middleground/metermg.*', parent_code: 'PropertyContract', code: 'MeterMg', name: '水电单价管理' },
    /**
     * 系统配置(System)
     */
    { reg: '/middleground/basicdata.*', parent_code: 'System', code: 'Parameter', name: '基础数据' },
    { reg: '/middleground/basicdata/adviceCollection.*', parent_code: 'System', code: 'Parameter', name: '收款通知' },
    { reg: '/fed/basicdata.*', parent_code: 'System', code: 'Parameter', name: '基础数据' },
    { reg: '/static/basicdata.*', parent_code: 'System', code: 'Parameter', name: '基础数据' },
    { reg: '/static/print.*', parent_code: 'System', code: 'Parameter', name: '基础数据' },
    { reg: '/static/template.*', parent_code: 'System', code: 'Parameter', name: '基础数据' },
    { reg: '/static/apartment.*', parent_code: 'System', code: 'Parameter', name: '户型管理' },
    { reg: '/static/inner-tools.*', parent_code: 'System', code: 'Parameter', name: '基础数据' },
    { reg: '/static/globaldata.*', parent_code: 'System', code: 'Global', name: '全局参数' },
];

export function getActiveMenu(pathName: string): { parent_code: string; code: string } {
    for (const item of maps) {
        const reg = new RegExp(item.reg);
        if (reg.test(pathName)) {
            return { parent_code: item.parent_code, code: item.code };
        }
    }
    return { parent_code: '', code: '' };
}
