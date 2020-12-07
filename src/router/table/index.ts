import { RouteRecordRaw } from 'vue-router'
/**
 * 表格
 */
const table: RouteRecordRaw[] = [
  {
    path: '/table',
    name: 'Table',
    component: () =>
      import(/* webpackChunkName: "Layout" */ '@/layout/index.vue'),
    meta: { title: '表格' },
    children: [
      {
        path: 'basic',
        name: 'TableBasic',
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
    ],
  },
]

export default table
