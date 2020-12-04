import { RouteRecordRaw } from 'vue-router'
import common from './common'
/**
 * 表格
 */
import table from './table'
const routes: RouteRecordRaw[] = [...common, ...table]

export default routes
