import { RouteRecordRaw } from 'vue-router'
import common from './common'
import error from './error'
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
const routes: RouteRecordRaw[] = [
  ...common,
  ...table,
  ...demo,
  ...account,
  ...error,
]

export default routes
