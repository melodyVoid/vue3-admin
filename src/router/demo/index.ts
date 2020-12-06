import { RouteRecordRaw } from 'vue-router'
/**
 * demo
 */
const demo: RouteRecordRaw[] = [
  {
    path: '/demo',
    name: 'Demo',
    component: () =>
      import(/* webpackChunkName: "Layout" */ '@/layout/index.vue'),
    meta: { title: 'Demo' },
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
