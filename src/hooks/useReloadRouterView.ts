import { provide, inject, ref, nextTick } from 'vue'

const reloadSymbol = Symbol('reload')

const routerViewActive = ref<boolean>(true)

const sleep = (timeout: number) =>
  new Promise(resolve => setTimeout(resolve, timeout))
// 刷新页面时 loading 时间 （为什么要设置：如果没有 loading 效果的话，用户感知不出来页面刷新了）
const LOADING_DURATION = 400

const reloadRouterView = async (): Promise<void> => {
  routerViewActive.value = false
  await nextTick()
  await sleep(LOADING_DURATION)
  routerViewActive.value = true
}

export function provideReloadRouterView() {
  provide(reloadSymbol, reloadRouterView)
}

export function useReloadRouterView() {
  const reloadRouterView = inject(reloadSymbol)
  if (!reloadRouterView) {
    throw new Error('reloadRouterView is undefined')
  }
  return { reloadRouterView, routerViewActive }
}
