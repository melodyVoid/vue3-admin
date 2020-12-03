import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import useToken from '../hooks/useToken'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
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

export default router
