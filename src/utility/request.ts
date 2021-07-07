import axios, { AxiosInstance, AxiosResponse } from "axios";

const baseURL =
    process.env.NODE_ENV === "production" ? "/" : "http://127.0.0.1:7001/";

const instance = setInterceptor(
    axios.create({
        baseURL,
        timeout: 3000,
        // headers: {},
        // withCredentials: true
    })
);

/**
 * 为axios设置拦截器
 * @param {Object} instance axios实例
 */
function setInterceptor(instance: AxiosInstance) {
    instance.interceptors.request.use(config => {
        const jwtToken = sessionStorage.getItem('user_token');
        // console.log('in axios:', sessionStorage.getItem('user_token'));
        if (jwtToken !== null) {
            config.headers["Authorization"] = jwtToken;
        }
        return config;
    });
    instance.interceptors.response.use(
        res => {
            return res.data;
        },
        err => {
            return Promise.reject(err);
        }
    );
    return instance;
}

/**
 * request()方法返回数据格式
 */
interface RequestReslut<T = any> {
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
function request(options = {}) {
    return instance.request<any, AxiosResponse<any>>(options);
}

export { request, RequestReslut };
