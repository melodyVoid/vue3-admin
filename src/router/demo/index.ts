import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/**
 * demo
 */
const demo: RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    redirect: { name: 'DemoBasic' },
    meta: { title: 'Demo', icon: 'default' },
    component: Layout,
    children: [
      {
        path: 'basic',
        name: 'DemoBasic',
        meta: { title: '基础Demo' },
        component: () =>
          import(
            /* webpackChunkName: "DemoBasic" */ '@/views/demo/list/index.vue'
          ),
      },
    ],
  },
]

export default demo
