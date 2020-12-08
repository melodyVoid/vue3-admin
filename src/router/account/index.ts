import { RouteRecordRaw } from 'vue-router'
/**
 * 我的
 */
const account: RouteRecordRaw[] = [
  {
    path: '/account',
    name: 'Account',
    redirect: { name: 'AccountSettings' },
    meta: { title: '我的', icon: '我的' },
    component: () =>
      import(/* webpackChunkName: "Layout" */ '@/layout/index.vue'),
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
