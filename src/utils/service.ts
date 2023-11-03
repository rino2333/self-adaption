import router from '@/router';
import axios, { AxiosRequestConfig} from 'axios'
import { ElMessage } from "element-plus";
interface ResponseType<T = any> {
    code: number;
    data: T;
    message: string;
}
// 创建axios实例
const service = axios.create({
    // baseURL: '/api',
    timeout: 80000,
    withCredentials: true
})
 
// request拦截器
service.interceptors.request.use(
    config => {
        let token = localStorage.getItem("token");
        if (token) {
            //添加请求头
            config.headers["Authorization"] = "Bearer "+ token;
        }
        // config.headers['Content-Type'] = 'application/text/html;charset=utf-8'
        config.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
        
        // const params = config.data;
        // let formData = new FormData;
        // for (const key in params) {
        //     if (params.hasOwnProperty(key)) {
        //         formData.append(key, params[key]);
        //     }
        // }
        // config.data = formData;
             return config
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error)
    }
)
 
// response 拦截器
service.interceptors.response.use(
    response => {
        console.log(response);

        if (response.data.code != 0) {
            if (response.data.code == -100) {
                router.push('/login');
            }
            ElMessage.error(response.data.message);
            return Promise.reject(response.data);
        } else {
            // 对响应数据做点什么
            return response;
        }
        
    },
    error => {  
        // 对响应错误做点什么
        console.log(error);
        console.log(error.message);
        ElMessage.error(error.message);
        
        return Promise.reject(error)
    }
)

const request = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
    try {
        const { data } = await service.request<ResponseType<T>>(config);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default request