import queryString from 'query-string';
import { getHomeBaseInfo, getWorkflowTodo, getWHWorkflowTodo } from '../../service';
import UserEntity from '../entity/UserEntity';
import UserEntityMethod from '../entity/UserEntityMethod';
import { BaseInfoData } from '../../type';
import { ResponseData } from '@/types/common';

export default class UserService {
    /**
     * 获取菜单和用户信息
     * @returns
     */
    static async fetchHomeBaseInfo(): Promise<ResponseData<BaseInfoData> & { userInfo: UserEntity }> {
        const query = queryString.parse((window.location as any).search);
        const smp = ((query._smp as string | undefined) || '').split('.')[0];
        query._smp = smp;
        const res = await getHomeBaseInfo(query);
        if (!res.result) {
            return { ...res, userInfo: UserEntityMethod.getEmptyUserInfo() };
        }
        const data = res.data || {};
        // 补全数据，防止报错
        data.funcNav = data.funcNav || {
            apps: [],
            functions: [],
        };
        data.logo_info = data.logo_info || {
            icon: '',
            logo: '',
            title: '',
        };
        data.user = data.user || {};
        return { ...res, userInfo: new UserEntity(data) };
    }

    /**
     * 获取用户在租赁审批系统的待办审批数量统计
     * @returns
     */
    static async fetchWorkflowTodo() {
        const res = await getWorkflowTodo();
        // 补全数据，防止报错
        if (res.result && !res.data?.workflow) {
            res.data = {
                workflow: {
                    total_not_approved: 0,
                    total_todo: 0,
                    total_withdraw: 0,
                },
            };
        }
        return res;
    }

    /**
     * 获取用户在武汉审批中心的待办审批数量统计
     * @returns
     */
    static async fetchWHWorkflowTodo() {
        const res = await getWHWorkflowTodo();
        // 补全数据，防止报错
        if (res.result && !res.data) {
            res.data = {
                todo_number: 0,
            };
        }
        return res;
    }
}
