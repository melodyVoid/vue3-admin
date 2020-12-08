import { Module, MutationTree } from 'vuex'
import { RootState } from '../index'
import { RouteRecordRaw } from 'vue-router'
import { getMenuTabs, setMenuTabs } from '@/utils/local-storage'

/**
 * 系统的一些设置
 */
export type MenuTabRaw = Pick<RouteRecordRaw, 'name' | 'meta'>
export interface AppState {
  /** 切换路由时的 loading */
  spinning: boolean
  /** 菜单是否折叠 */
  collapsed: boolean
  menuTabs: MenuTabRaw[]
}

const state: AppState = {
  spinning: false,
  collapsed: false,
  menuTabs: getMenuTabs(),
}

const mutations: MutationTree<AppState> = {
  SET_SPINNING(state: AppState, spinning: boolean) {
    state.spinning = spinning
  },
  TOGGLE_COLLAPSE(state: AppState) {
    state.collapsed = !state.collapsed
  },
  SET_MENU_TABS(state: AppState, menuTabs: MenuTabRaw[]) {
    state.menuTabs = menuTabs
    setMenuTabs(menuTabs)
  },
}
const app: Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations,
}

export default app
