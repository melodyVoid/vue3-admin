import { createRouter, createWebHashHistory } from 'vue-router'
import useToken from '../hooks/useToken'
import store from '@/store'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  store.commit('app/SET_SPINNING', true) // 切换路由时打开 spinning
  // 获取 store 里的 token
  const token = useToken()
  if (token) {
    // 已经登录了再访问登录页面就跳回原页面
    if (to.path === '/login') {
      next(from)
    } else {
      if (!store.state.user.userInfo.name) {
        // 没有拉取过用户信息
        // 用 token 换用户信息
        await store.dispatch('user/GetInfo')
      }
      next()
    }
  } else {
    // 没有 token
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  store.commit('app/SET_SPINNING', false)
})

export default router
