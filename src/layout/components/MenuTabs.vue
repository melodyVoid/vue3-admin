<template>
  <div class="menu-tabs">
    <a-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      hide-add
      @change="handleChangeMenuTab"
    >
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
  name: route.name,
  meta: route.meta,
})
/**
 * 高亮的tab
 */
const activeKey = ref<string | symbol>(route.name)

const menuTabs = computed(() => store.state.app.menuTabs)

watchEffect(() => {
  if (menuTabs.value.find(item => item.name === route.name) === undefined) {
    store.commit('app/SET_MENU_TABS', [...menuTabs.value, menuTab(route)])
  }
  activeKey.value = route.name
})

const handleChangeMenuTab = (activeKey: string) => {
  router.push({ name: activeKey })
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
