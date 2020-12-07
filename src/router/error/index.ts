import { RouteRecordRaw, RouterView } from 'vue-router'
import { defineComponent, h } from 'vue'
import Footer from '@/layout/components/Footer.vue'
const error: RouteRecordRaw[] = [
  {
    path: '/error',
    name: 'Error',
    meta: { title: '错误页', icon: 'default' },
    // 全屏页面
    component: defineComponent({
      setup() {
        return () => h('div', [h(RouterView), h(Footer)])
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
      {
        path: '404',
        name: 'Error404',
        meta: { title: '404' },
        component: () =>
          import(/* webpackChunkName: "Error404" */ '@/views/error/404.vue'),
      },
    ],
  },
]
export default error
