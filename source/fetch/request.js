import axios from 'axios'
import { ACTION } from '../config/config'
// 设置请求超时时间
const http = axios.create({
    timeout: 20000
})

// POST请求前将数据转化成FormData对象
http.interceptors.request.use(config => {
    config.data = JSON.stringify(config.data)

    // 判断是否存在token，如果存在的话，则每个http header都加上token
    // config.headers['api-token'] = `tocken`

    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjEzNzAxMjczOTk0In0sImlhdCI6MTU1MTQzMTQ5MX0.I1rCz_hzIhUSpUj7c56jE2LKqlVEGvM4DuTjwbmrZXc'
    config.headers['Content-Type'] = 'application/json'

    return config
})

// 边缘处理
http.interceptors.response.use((res) => {
    return Promise.resolve(res)
}, (error) => {
    return Promise.reject({error, ACTION})
})

// 请求类
class Request {
    // GET请求
    get(controller, data = {}, config = {}) {
        let params = {
            params: data
        }

        const url = this.buildUrl(controller)
        return http.get(url, params, config)
    }

    // POST 请求 userAction
    post(action, data = {}, config = {}, userAction) {
        let url = action
        if (!userAction) {
            url = this.buildUrl(action)
        }
        return http.post(url, data, config)
    }

    // put 请求
    put(action, data = {}, config = {}) {
        const url = this.buildUrl(action)
        return http.put(url, data, config)
    }

    // 构建请求url
    buildUrl(action) {
        let url = `${ACTION}${action}`
        return url
    }
}
const request = new Request()
export default request
