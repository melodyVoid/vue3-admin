import router from '../router/index'
export default function useGoBack() {
  const goBack = () => router.go(-1)
  return { goBack }
}
