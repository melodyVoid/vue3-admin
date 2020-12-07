import { RouteRecordRaw } from 'vue-router'
import common from './common'
/**
 * 表格
 */
import table from './table'
/**
 * Demo
 */
import demo from './demo'
/**
 * 我的
 */
import account from './account'
const routes: RouteRecordRaw[] = [...common, ...table, ...demo, ...account]

export default routes
