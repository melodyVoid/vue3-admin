import { createStore } from 'vuex'
import user, { UserState } from './modules/user'
import app, { AppState } from './modules/app'
export interface RootState {
  user: UserState
  app: AppState
}
export default createStore({
  modules: {
    user,
    app,
  },
})
