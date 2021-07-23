//统一发送ajax请求的接口
import ajax from '@/api/utils/ajax';
import { BaseInfoData, WorkflowToDoStats, WhWorkflowToDoStats } from './type';
import { ResponseData } from '@/types/common';

// 获取菜单和用户信息
export const getHomeBaseInfo = (data: object): Promise<ResponseData<BaseInfoData>> => {
    return ajax('/home/base-info', data, 'GET');
};

// 获取工作流信息
export const getWorkflowTodo = (): Promise<ResponseData<{ workflow: WorkflowToDoStats }>> => {
    return ajax('/business/workflow/get-todo', {}, 'GET');
};

// 获取武汉工作流信息
export const getWHWorkflowTodo = (): Promise<ResponseData<WhWorkflowToDoStats>> => {
    return ajax('/business/workflow/get-todo-number', {}, 'GET');
};

// 登出系統
export const loginOut = () => {
    return ajax('/auth/logout', {}, 'POST');
};
