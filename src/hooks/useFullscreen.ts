import { Ref, ref, watchEffect } from 'vue'

export default function useFullscreen(
  target?: Ref<Element | null | undefined>
) {
  const isFullscreen = ref<boolean>(false)
  const targetRef = ref(target ?? document.documentElement)

  watchEffect(() => {
    targetRef.value?.addEventListener?.('fullscreenchange', () => {
      isFullscreen.value = document.fullscreenElement !== null
    })

    targetRef.value?.addEventListener?.('fullscreenerror', error => {
      console.log(error)
    })
  })

  const exitFullscreen = async (): Promise<void> => {
    if (document.fullscreenElement) {
      await document?.exitFullscreen?.()
    }
  }

  const requestFullscreen = async (): Promise<void> => {
    // 全屏前先退出全屏，解决在一个全屏下打开另外一个全屏打不开的问题
    await exitFullscreen?.()

    if (!document.fullscreenElement) {
      await targetRef.value?.requestFullscreen?.()
    }
  }

  const toggleFullscreen = async () => {
    isFullscreen.value ? await exitFullscreen() : await requestFullscreen()
  }

  return {
    isFullscreen,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
  }
}
