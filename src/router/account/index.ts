import { RouteRecordRaw } from 'vue-router'
/**
 * 我的
 */
const account: RouteRecordRaw[] = [
  {
    path: '/account',
    name: 'Account',
    component: () =>
      import(/* webpackChunkName: "Layout" */ '@/layout/index.vue'),
    meta: { title: '我的' },
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
