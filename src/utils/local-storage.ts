import useLocalStorage from '../hooks/useLocalStorage'
import { RouteRecordRaw } from 'vue-router'

export const [getToken, setToken, removeToken] = useLocalStorage('token')

export const [getMenuTabs, setMenuTabs] = useLocalStorage<RouteRecordRaw[]>(
  'menu-tabs',
  []
)
