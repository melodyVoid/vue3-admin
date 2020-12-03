import useLocalStorage from '../hooks/useLocalStroage'

export const [getToken, setToken, removeToken] = useLocalStorage('token')
