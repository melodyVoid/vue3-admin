import { createStore } from 'vuex'
import user, { UserState } from './modules/user'
export interface RootState {
  user: UserState
}
export default createStore({
  modules: {
    user,
  },
})
