import { Module, MutationTree } from 'vuex'
import { RootState } from '../index'

/**
 * 系统的一些设置
 */
export interface AppState {
  /** 切换路由时的 loading */
  spinning: boolean
  /** 菜单是否折叠 */
  collapse: boolean
}

const state: AppState = {
  spinning: false,
  collapse: false,
}

const mutations: MutationTree<AppState> = {
  SET_SPINNING(state: AppState, spinning: boolean) {
    state.spinning = spinning
  },
  TOGGLE_COLLAPSE(state: AppState) {
    state.collapse = !state.collapse
  },
}
const app: Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations,
}

export default app
