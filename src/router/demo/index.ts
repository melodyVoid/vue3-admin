import { RouteRecordRaw } from 'vue-router'
/**
 * demo
 */
const demo: RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    redirect: { name: 'DemoBasic' },
    meta: { title: 'Demo', icon: 'default' },
    component: () =>
      import(/* webpackChunkName: "Layout" */ '@/layout/index.vue'),
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
