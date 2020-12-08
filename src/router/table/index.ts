import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
/**
 * 表格
 */
const table: RouteRecordRaw[] = [
  {
    path: '/table',
    name: 'Table',
    redirect: { name: 'TableBasic' },
    meta: { title: '表格', icon: '表格' },
    component: Layout,
    children: [
      {
        path: 'basic',
        name: 'TableBasic',
        redirect: '/table/basic/basic1',
        meta: { title: '基础表格' },
        component: () =>
          import(
            /* webpackChunkName: "TableBasic" */ '@/views/table/basic/index.vue'
          ),
        children: [
          {
            path: 'basic1',
            name: 'TableBasic1',
            meta: { title: '基础表格1' },
            component: () =>
              import(
                /* webpackChunkName: "TableBasic" */ '@/views/table/basic/index.vue'
              ),
          },
        ],
      },
      {
        path: 'basic2',
        name: 'TableBasic2',
        meta: { title: '基础表格2', hidden: false },
        component: () =>
          import(
            /* webpackChunkName: "TableBasic" */ '@/views/table/basic/index.vue'
          ),
      },
    ],
  },
]

export default table
