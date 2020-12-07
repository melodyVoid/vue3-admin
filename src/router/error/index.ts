import { RouteRecordRaw } from 'vue-router'
import { defineComponent, h } from 'vue'
const error: RouteRecordRaw[] = [
  {
    path: '/error',
    name: 'Error',
    meta: { title: '错误页', icon: 'default' },
    // 全屏页面
    component: defineComponent({
      setup() {
        return () => h('router-view')
      },
    }),
    children: [
      {
        path: '403',
        name: 'Error403',
        meta: { title: '403' },
        component: () =>
          import(/* webpackChunkName: "Error403" */ '@/views/error/403.vue'),
      },
    ],
  },
]
export default error
