import webConfig from '@/config/web.json';
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { SessionStorageKeys } from '@/utility/helper';

const { devBaseURL, prodBaseURL } = webConfig;
const baseURL = process.env.NODE_ENV === 'development' ? devBaseURL : prodBaseURL;

const instance = setInterceptor(
    axios.create({
        baseURL,
        timeout: 3000,
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        } //IE浏览器禁用页面缓存
        // withCredentials: true
    })
);

/**
 * 为axios设置拦截器
 * @param {Object} instance axios实例
 */
function setInterceptor(instance: AxiosInstance) {
    instance.interceptors.request.use(config => {
        const token = sessionStorage.getItem(SessionStorageKeys.UserToken);
        if (token !== null) {
            config.headers['Authorization'] = token;
        }
        return config;
    });
    instance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return instance;
}

/**
 * request()方法返回数据格式
 */
interface RequestResult<T = any> {
    /**
     * 状态值
     */
    code: number,
    /**
     * 结果
     */
    data: T,
    /**
     * 错误对象
     */
    error: Error | null,
    /**
     * 其它
     */
    [extraProp: string]: any
}

/**
 * 封装ajax请求
 */
function request<T = any>(options: AxiosRequestConfig = {}) {

    return instance.request<any, RequestResult<T>>(options);
}

export { request, RequestResult };
