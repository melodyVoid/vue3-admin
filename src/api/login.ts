import request from '@/libs/axios'
import { LoginFormData } from '../views/login/hooks/useLogin'

/**
 * @description 登录接口
 * @date 2020/11/10
 */
export function login(data: LoginFormData) {
  return Promise.resolve({
    token: 'xxxxx',
  })
  // return request({
  //   url: '/login',
  //   method: 'post',
  //   data,
  // })
}

/**
 * @description 携带 token 来获取用户信息
 * @date 2020/11/10
 */
export function getUserInfo() {
  return request({
    url: '/account',
    method: 'get',
  })
}
