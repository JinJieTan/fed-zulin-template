import FormData from 'form-data'
import axios from 'axios';
import config from '../../config';
import getApiPath from './getApiPath';
import getFetchOptions from './getFetchOptions';
import { serverMap } from '../config';
import { message } from 'antd';
const { DEV } = config;
const instantce = axios.create()

instantce.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
        config.headers['Content-type'] = 'multipart/form-data';
    }
    return config;
});
export default function ajax(path: string, data: object, method: 'GET' | 'POST', otherServer: string = '') {
    let promise;
    let serverDomain = '';
    const fetchOptions = getFetchOptions(getApiPath(path), method);
    otherServer && serverMap[otherServer] && (serverDomain = serverMap[otherServer][DEV ? 'test' : 'prod']);
    const url = `${serverDomain}${fetchOptions.endpoint}`;
    const headers = fetchOptions.headers;
    if (method === 'GET') {
        instantce.defaults.headers.get = {
            ...headers,
        };
        promise = instantce.get(url, {
            params: { ...data },
        });
    } else {
        instantce.defaults.headers.post = {
            ...headers,
        };
        promise = instantce.post(url, data);
    }
    return promise
        .then(res => {
            if (!res?.data?.result) message.error(res?.data?.msg || '网络请求失败');
            return res.data;
        })
        .catch(err => {
            // 状态码非200情况
            const { response = {} } = err;
            const { data = {} } = response;
            if (response.status === 401) {
                if (!DEV) {
                    location.href = data.login_url + '?returnUrl=' + decodeURIComponent(location.href);
                } else {
                    const loginUrl = data.login_url
                        ? data.login_url.replace(/^(.+)\?(.*)/, '$1')
                        : 'https://passport-ykj-test.myfuwu.com.cn/auth/login';
                    location.href = loginUrl + '?returnUrl=' + decodeURIComponent(location.origin);
                }
            } else {
                console.error('请求失败了', err);
                message.error(data.msg || '网络请求失败');
            }
        });
}
