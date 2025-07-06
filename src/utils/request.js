import axios from 'axios'
// const baseURL = 'http://big-event-vue-api-t.itheima.net'
// const baseURL = 'http://127.0.0.1:8000'
const baseURL = 'http://47.93.81.21:8000'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 60000, // 增加到60秒，匹配后端超时时间
})

// // 请求拦截器
// instance.interceptors.request.use(
//   (config) => {
//     // TODO 2. 携带token
//     const useStore = useUserStore()
//     if (useStore.token) {
//       config.headers.Authorization = useStore.token
//     }
//     return config
//   },
//   (err) => Promise.reject(err)
// )

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    console.log(res.data)
    // 直接返回响应数据，让业务层处理具体的业务逻辑
    return res
  },
  (err) => {
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 401 权限不足 或 token 过期 => 拦截到登录
    if (err.response?.status === 401) {
      // router.push('/login')
    }

    // 错误的默认情况 => 只要给提示
    // ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  },
)

export default instance
export { baseURL }
