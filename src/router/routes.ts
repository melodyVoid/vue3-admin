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
const routes: RouteRecordRaw[] = [...common, ...table, ...demo]

export default routes
