import { message, notification } from 'ant-design-vue'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@/store'
import useToken from '../../hooks/useToken'

export interface ResponseData {
  message: string
  code: ResponseCode
  data: unknown
}

export enum ResponseCode {
  SUCCESS,
  ERROR,
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000,
})

service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 响应拦截
    if (response.data.code === ResponseCode.SUCCESS) {
      return response
    }
    if (response.data.code === ResponseCode.ERROR) {
      message.error(response.data.message)
      return Promise.reject(response.data)
    }
    return response
  },
  (error: AxiosError<ResponseData>) => {
    if (error.response) {
      const data = error.response?.data
      const token = useToken()
      switch (error.response.status) {
        case 403:
          notification.error({
            message: 'Forbidden',
            description: data.message,
          })
          break
        case 401:
          notification.error({
            message: 'Unauthorized',
            description: 'Authorization verification failed',
          })
          if (token) {
            store.dispatch('user/Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          }
          break
        default:
          message.error(error.response?.data?.message)
      }
    }
    return Promise.reject(error.response?.data)
  }
)

service.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = useToken()
  // 如果有 token，将 token 存在请求头里面
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
})

const request = async <T = ResponseData>(config: AxiosRequestConfig) => {
  const { data } = await service.request<T>(config)
  return data
}

export default request
