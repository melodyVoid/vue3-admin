import { reactive } from 'vue'

export interface LoginFormData {
  account: string
  password: string
}
export default function useLogin() {
  const loginForm = reactive<LoginFormData>({
    account: '',
    password: '',
  })

  return {
    loginForm,
  }
}
