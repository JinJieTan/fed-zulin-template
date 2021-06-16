/**
 * 由于菜单只能匹配一个地址，但某些菜单下的子页面可能是在内页中跳转，可能使用当前菜单无法高亮，这里另作配置，详见PageMenu.jsx实现
 * @type {Object}
 */

export const maps = [
    /**
     * key，菜单地址（不需把bastPath，以及它的查询参数写上，在PageMenu中会处理），value，正则表达式，用来匹配页面路由地址
     */
    { reg: '/middleground/workspace.*', key: 'Index', code: 'Workbench', name: '工作台' },
    { reg: '/middleground/report.*', key: 'Statistical', code: 'Report', name: '统计报表' },
    { reg: '/middleground/basicdata.*', key: 'System', code: 'Parameter', name: '基础数据' },
    { reg: '/middleground/metermg.*', key: 'PropertyContract', code: 'MeterMg', name: '水电单价管理' },
    { reg: '/middleground/meter.*', key: 'PropertyContract', code: 'Meter', name: '抄表管理' },
    { reg: '/middleground/derate.*', key: 'Finance', code: 'Derate', name: '减免管理' },
    { reg: '/middleground/sundry.*', key: 'Finance', code: 'Sundry', name: '杂项费用' },
    { reg: '/middleground/basicfee.*', key: 'Finance', code: 'Fee', name: '基本费项' },
    { reg: '/middleground/basicdata/adviceCollection.*', key: 'System', code: 'Parameter', name: '收款通知' },
    { reg: '/middleground/outlay.*', key: 'Finance', code: 'Outlay', name: '收支管理' },
    { reg: '/middleground/checkin.*', key: 'LeaseManage', code: 'CheckIn', name: '入驻办理' },
    { reg: '/middleground/contract.*', key: 'ContractManage', code: 'Contract', name: '合同列表' },
    { reg: '/middleground/policy.*', key: 'ContractManage', code: 'RentPolicy', name: '租赁政策' },
    { reg: '/middleground/room.*', key: 'Resource', code: 'Room', name: '资源管理' },
    { reg: '/middleground/repay.*', key: 'Resource', code: 'Stage', name: '项目管理' },
    { reg: '/middleground/accrual.*', key: 'Finance', code: 'FinanceAccrual', name: '权责管理' },
    { reg: '/middleground/lockManagement.*', key: 'Resource', code: 'SafeGuard', name: '锁定管理' },
    {
        reg: '/middleground/renter-customers-service/list.*',
        key: 'LeaseManage',
        code: 'RenterCustomersService',
        name: '租户服务',
    },
    { reg: '/middleground/lease/list.*', key: 'LeaseManage', code: 'Relet', name: '续租办理' },
];

export function getKey(pathName: any) {
    let key, code;
    for (const k in maps) {
        if (!Object.prototype.hasOwnProperty.call(maps, k)) continue;
        const reg = new RegExp(maps[k].reg);
        if (reg.test(pathName)) {
            key = maps[k].key;
            code = maps[k].code;
            break;
        }
    }
    return {
        key,
        code,
    };
}
