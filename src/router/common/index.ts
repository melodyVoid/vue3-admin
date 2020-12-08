import { RouteRecordRaw } from 'vue-router'
const common: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'Layout',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    meta: { title: '系统看板', icon: 'dashboard', hidden: false },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        meta: { title: '首页' },
      },
    ],
  },
]
export default common
