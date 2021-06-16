// import { actionType } from '@/types/common';
interface state {
    list: string[];
}

interface user {
    account: string;
    displayName: string;
    display_name: string;
    key: string;
    org_id: string;
    organ_name: string;
    tenantCode: string;
    tenant_code: string;
    tenant_name: string;
    user_id: string;
}

interface app {
    app_code: string;
    app_name: string;
    className: string;
    site_url: string;
    url: string;
}

interface logoInfoType {
    icon: string;
    logo: string;
    title: string;
}

interface initState {
    user: user;
    appCode: string;
    appList: app[];
    logoInfo: logoInfoType;
    logoutUrl: string;
    passwordUrl: string;
    is_enabled_wh_workflow: boolean;
    loadingStackMap: {
        [index: string]: {
            num: number;
            selector: string;
        };
    };
}

interface initDataPayloadType {
    type: string;
    data?: initState; // 在dva中，这不是必要参数
}

interface increaseDataType {
    loadingId: string;
}

// 这是一个list示例模块，仅作为参考
export default {
    namespace: 'main',
    state: {
        collapsed: false,
        user: {},
        appCode: '',
        appList: [],
        logoInfo: {},
        logoutUrl: '',
        passwordUrl: '',
        is_enabled_wh_workflow: false,
        is_pured: false,
        // loading 控制状态
        loadingStackMap: {
            default: {
                num: 0,
                selector: '#antContentArea',
            },
        },
    },
    reducers: {
        initBaseInfo(state: initState, payload: initDataPayloadType) {
            let obj = Object.assign({}, state, payload.data);
            try {
                obj = JSON.parse(JSON.stringify(obj));
            } catch (e) {}
            return { ...obj };
        },
        // 触发loading
        // increaseLoading(state: initState, payload: actionType<increaseDataType>) {
        //     const loadingId = payload.data?.loadingId || 'default';
        //     const loadingStackMap = { ...state.loadingStackMap };
        //     if (loadingStackMap[loadingId]) {
        //         loadingStackMap[loadingId].num += 1;
        //     } else {
        //         const loadingStack = {
        //             num: 1,
        //             selector: loadingId,
        //         };
        //         loadingStackMap[loadingId] = loadingStack;
        //     }
        //     return {
        //         ...state,
        //         loadingStackMap,
        //     };
        // },
        // 关闭loading
        // decreaseLoading(state: initState, payload: actionType<increaseDataType>) {
        //     const loadingId = payload.data?.loadingId || 'default';
        //     const loadingStackMap = { ...state.loadingStackMap };
        //     if (loadingStackMap[loadingId]) {
        //         if (loadingStackMap[loadingId].num > 0) {
        //             loadingStackMap[loadingId].num -= 1;
        //         }
        //     }
        //     return {
        //         ...state,
        //         loadingStackMap,
        //     };
        // },
        // 关闭所有loading
        decreaseAllLoading(state: initState) {
            const loadingStackMap = { ...state.loadingStackMap };
            const loadingIds = Object.keys(loadingStackMap);
            loadingIds.forEach(id => {
                loadingStackMap[id].num = 0;
            });
            return {
                ...state,
                loadingStackMap,
            };
        },
    },
};
