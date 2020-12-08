<template>
  <div class="menu-tabs">
    <a-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      hide-add
      @change="handleChangeMenuTab"
      @edit="handleCloseMenuTab"
    >
      <a-tab-pane key="Dashboard" tab="首页" :closable="false"></a-tab-pane>
      <a-tab-pane
        v-for="item of menuTabs"
        :key="item.name"
        :tab="item.meta.title"
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import type { MenuTabRaw } from '@/store/modules/app'
import type { RouteLocationNormalized } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useStore()

/**
 * 提取部分路由信息
 */
const menuTab = (route: RouteLocationNormalized): MenuTabRaw => ({
  name: route.name ?? '',
  meta: route.meta,
})
/**
 * 高亮的tab
 */
const activeKey = ref<string | symbol>(route?.name ?? '')
// 缓存被删除的 tabKey，用于在下面 watchEffect 的时候不向 mentTabs 里 push 数据
const removeKey = ref<string | symbol>('')

const menuTabs = computed<MenuTabRaw[]>(() => store.state.app.menuTabs)

watchEffect(() => {
  activeKey.value = route.name ?? ''
  if (route.name === 'Dashboard' || route.name === removeKey.value) {
    // 这里要清空一下，不然下次点击 removeKey 对应的菜单时不会向 menuTabs 里添加数据
    removeKey.value = ''
    return
  }
  if (menuTabs.value.find(item => item.name === route.name) === undefined) {
    store.commit('app/SET_MENU_TABS', [...menuTabs.value, menuTab(route)])
  }
})

/**
 * 切换 tab
 */
const handleChangeMenuTab = (activeKey: string) => {
  router.push({ name: activeKey })
}

/**
 * 关闭 tab
 */
const handleCloseMenuTab = (targetKey: string, action: 'remove' | 'add') => {
  // 缓存 removeKey
  removeKey.value = targetKey
  if (action === 'remove') {
    const targetIndex = menuTabs.value.findIndex(item => item.name === targetKey)
    const leftTabs = menuTabs.value.slice(0, targetIndex)
    const rightTabs = menuTabs.value.slice(targetIndex + 1)
    const tabs = [...leftTabs, ...rightTabs]
    // 如果关闭当前页面
    if (targetKey === activeKey.value) {
      if (tabs.length === 0) {
        router.push({ name: 'Dashboard' })
      } else {
        router.push({ name: tabs[tabs.length - 1].name })
      }
    }
    store.commit('app/SET_MENU_TABS', tabs)
  }

}
</script>
<style lang="scss" scoped>
.menu-tabs {
  grid-area: tabs;
  padding: 0 20px;
  align-self: end;
  ::v-deep(.ant-tabs-bar.ant-tabs-top-bar.ant-tabs-card-bar) {
    margin-bottom: 0;
  }
}
</style>
