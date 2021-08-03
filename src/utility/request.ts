import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL =
    process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001/' : 'http://192.168.1.11:7001/';

const instance = setInterceptor(
    axios.create({
        baseURL,
        timeout: 3000,
        // headers: { 'Content-Type': 'application/json;charset=utf8' }
        // withCredentials: true
    })
);

/**
 * 为axios设置拦截器
 * @param {Object} instance axios实例
 */
function setInterceptor(instance: AxiosInstance) {
    instance.interceptors.request.use(config => {
        const token = sessionStorage.getItem('user_token');
        // console.log('in axios:', sessionStorage.getItem('user_token'));
        if (token !== null) {
            config.headers["Authorization"] = token;
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
