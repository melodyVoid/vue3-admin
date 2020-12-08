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
    redirect: { name: 'Dashboard' },
    meta: { title: '系统看板', icon: 'dashboard', hidden: false },
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        meta: { title: '首页' },
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
      },
    ],
  },
]
export default common
