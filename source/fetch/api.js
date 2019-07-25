// 页面获取tocken
import axios from 'axios'
import { ACTION } from '../config/config'
import {handleToast} from '@/utils/tools'
// 设置请求超时时间
const http = axios.create({
    timeout: 20000
})

// POST请求前将数据转化成FormData对象
/* http.interceptors.request.use(config => {
// config.data = JSON.stringify(config.data)

// 判断是否存在token，如果存在的话，则每个http header都加上token
config.headers['token'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjE2NjIyMTU3NTI0In0sImlhdCI6MTU1MTc3OTE2NX0.r1ot-MwCNaihaof3C9foC5WLejTTWmRrZGAYBAclnjg`

return config
}) */

// 边缘处理
http.interceptors.response.use((res) => {
    return Promise.resolve(res)
}, (error) => {
    const code = error.request.status
    handleToast(`后台返回字段缺失，code:${code}`)
    return Promise.reject({error, ACTION})
})

// 请求类
class Request {
    constructor(token) {
        // POST请求前将数据转化成FormData对象
        http.interceptors.request.use(config => {
            // config.data = JSON.stringify(config.data)

            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['Authorization'] = `Bearer ${token}`

            return config
        })
    }
    // GET请求
    get(controller, data = {}, config = {}) {
        let params = {
            params: data
        }

        const url = this.buildUrl(controller)
        return http.get(url, params, config)
    }

    // POST 请求
    post(action, data = {}, config = {}) {
        const url = this.buildUrl(action)
        return http.post(url, data, config)
    }
    // PUT 请求
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

export default Request
