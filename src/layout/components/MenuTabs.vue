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
    <a-dropdown>
      <a>更多操作 <DownOutlined /></a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0" @click="handleRefreshCurrentPage"
            ><ReloadOutlined /> 刷新页面</a-menu-item
          >
          <a-menu-divider />
          <a-menu-item key="1" @click="handleCloseCurrentPage"
            ><CloseOutlined /> 关闭页面</a-menu-item
          >
          <a-menu-divider />

          <a-menu-item key="2" @click="handleCloseOtherPages"
            ><SvgIcon name="close-others" /> 关闭其他</a-menu-item
          >
          <a-menu-divider />
          <a-menu-item key="3" @click="handleCloseAllPages"
            ><StopOutlined /> 关闭所有</a-menu-item
          >
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useReloadRouterView } from '@/hooks/useReloadRouterView'
import { DownOutlined, ReloadOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import type { MenuTabRaw } from '@/store/modules/app'
import type { RouteLocationNormalized } from 'vue-router'
import { message } from 'ant-design-vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const HOME = 'Dashboard'

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
  if (route.name === HOME || route.name === removeKey.value) {
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
const handleCloseMenuTab = (targetKey: string | symbol, action: 'remove' | 'add') => {

  if (action === 'remove') {
    // 缓存 removeKey
    removeKey.value = targetKey
    const targetIndex = menuTabs.value.findIndex(item => item.name === targetKey)
    const leftTabs = menuTabs.value.slice(0, targetIndex)
    const rightTabs = menuTabs.value.slice(targetIndex + 1)
    const tabs = [...leftTabs, ...rightTabs]
    // 如果关闭当前页面
    if (targetKey === activeKey.value) {
      if (tabs.length === 0) {
        router.push({ name: HOME })
      } else {
        router.push({ name: tabs[tabs.length - 1].name })
      }
    } else {
      // 如果关闭的不是当前页，重置 removeKey，要不然会添加不上 removeKey 所对应的菜单到 menuTabs
      removeKey.value = ''
    }
    store.commit('app/SET_MENU_TABS', tabs)
  }
}

/**
 * 刷新当前页面
 */
const { reloadRouterView } = useReloadRouterView()
const handleRefreshCurrentPage = () => {
  reloadRouterView()
}
/**
 * 关闭当前页面
 */
const handleCloseCurrentPage = () => {
  // 如果当前页面是首页的话就不关闭
  if (activeKey.value === HOME) {
    message.warning('首页不能被关闭')
    return
  }
  handleCloseMenuTab(activeKey.value, 'remove')
}

/**
 * 关闭其他页面
 */
const handleCloseOtherPages = () => {
  const currentMenuTab = menuTabs.value.find(item => item.name === activeKey.value)
  store.commit('app/SET_MENU_TABS', [currentMenuTab])
}

/**
 * 关闭所有页面
 */
const handleCloseAllPages = () => {
  router.push({ name: HOME })
  removeKey.value = activeKey.value
  store.commit('app/SET_MENU_TABS', [])
}
</script>
<style lang="scss" scoped>
.menu-tabs {
  grid-area: tabs;
  padding: 0 20px;
  align-self: end;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ::v-deep(.ant-tabs-bar.ant-tabs-top-bar.ant-tabs-card-bar) {
    margin-bottom: 0;
  }
}
</style>
