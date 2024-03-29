import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useForm } from '@ant-design-vue/use'
import { useStore } from 'vuex'

/**
 * 登录表单数据
 */
export interface LoginFormData {
  account: string
  password: string
}

/**
 * 登录逻辑
 */
export default function useLogin() {
  const store = useStore()
  const loginForm = reactive<LoginFormData>({
    account: '',
    password: '',
  })

  const rules = reactive({
    account: [
      {
        required: true,
        message: '请输入账号',
        trigger: ['blur', 'change'],
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'change'],
      },
    ],
  })
  const { validate, validateInfos } = useForm(loginForm, rules)
  const handleSubmit = async () => {
    try {
      await validate()
      // 发起请求
      await store.dispatch('user/Login', loginForm)
    } catch (error) {
      console.log(error)
      message.warning('表单填写有误，请检查')
    }
  }

  return {
    loginForm,
    validateInfos,
    handleSubmit,
  }
}
