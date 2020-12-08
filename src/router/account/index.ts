import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/**
 * 我的
 */
const account: RouteRecordRaw[] = [
  {
    path: '/account',
    name: 'Account',
    redirect: { name: 'AccountSettings' },
    meta: { title: '我的', icon: '我的' },
    component: Layout,
    children: [
      {
        path: 'settings',
        name: 'AccountSettings',
        meta: { title: '个人设置' },
        component: () =>
          import(
            /* webpackChunkName: "AccountSettings" */ '@/views/account/settings/index.vue'
          ),
      },
    ],
  },
]

export default account
