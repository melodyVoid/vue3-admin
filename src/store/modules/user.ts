import { getToken, setToken, removeToken } from '@/utils/local-storage'
import { MutationTree, Module, ActionTree } from 'vuex'
import { RootState } from '../index'
import { LoginFormData } from '@/views/login/hooks/useLogin'
import { login, getUserInfo } from '@/api/login'
import router from '@/router'
import { message } from 'ant-design-vue'
export interface UserInfo {
  name: string
}
export interface UserState {
  userInfo: UserInfo
  token: string
}

const state: UserState = {
  userInfo: {
    name: '',
  },
  token: getToken(),
}

const mutations: MutationTree<UserState> = {
  SET_TOKEN(state: UserState, token: string) {
    state.token = token
  },
  SET_USER_INFO(state: UserState, userInfo: UserInfo) {
    state.userInfo = userInfo
  },
}

const actions: ActionTree<UserState, RootState> = {
  async Login({ commit }, payload: LoginFormData) {
    try {
      console.log(payload)
      const { token } = await login(payload)
      console.log(token, 'token')
      commit('SET_TOKEN', token)
      setToken(token)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  },
  async GetInfo({ commit, dispatch }) {
    try {
      const userInfo = await getUserInfo()
      commit('SET_USER_INFO', userInfo)
    } catch (error) {
      console.log(error)
      message.error('验证失败，请重新登录')
      dispatch('Logout')
    }
  },
  async Logout({ commit }) {
    removeToken()
    commit('SET_TOKEN', '')
    router.push('/login')
    return
  },
}

const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}
export default user
