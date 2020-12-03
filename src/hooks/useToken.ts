import store from '@/store'

export default function useToken(): string {
  const token = store.state.user.token
  return token
}
