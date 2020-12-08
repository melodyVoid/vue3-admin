<template>
  <div class="sidebar">
    <a-menu
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      v-model:selectedKeys="currentRoute"
      v-model:openKeys="openKeys"
      @click="handleClickMenu"
    >
      <MenuItem v-for="menu of routes" :key="menu.name" :menu="menu"></MenuItem>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ref, computed, useCssVars, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
type RouteRecordName = string | symbol

const store = useStore()
const collapsed = computed(() => store.state.app.collapsed)

const router = useRouter()
 /**
  * 递归过滤二级菜单及以下的 hidden 掉的路由
  */
const filterHiddenRoutes = (item: RouteRecordRaw) => {
  if (item?.meta?.hidden) {
    return false
  } else {
    item.children = item.children?.filter(filterHiddenRoutes)
    return true
  }
}
/**
 * 过滤后的路由表，用于渲染侧边栏
 */
const routes = router.options.routes
  // 过滤掉登录页等其他 layout 之外的路由
  .filter(item => (item?.children?.length ?? 0) > 0)
  // 递归过滤掉 meta.hidden === true 的路由
  .filter(filterHiddenRoutes)

/**
 * 高亮当前菜单
 */
const route = useRoute()
const currentRoute = ref<RouteRecordName[]>([])
const openKeys = ref<RouteRecordName[]>([])
const preOpenKeys = ref<RouteRecordName[]>([])

watch(() => route.fullPath, () => {
  currentRoute.value = [route?.name ?? '']
  /**
   * ...openKeys.value  解决切换路由时，侧边栏总折起来的效果（类似手风琴）
   * ...route.matched.map(item => item?.name ?? '').slice(0, -1) 解决三级或更多级路由刷新页面后菜单展开不正确的 bug
   * 然后再对数组去重
   */
  openKeys.value = [...new Set([...openKeys.value, ...route.matched.map(item => item?.name ?? '').slice(0, -1)])]
}, { immediate: true })

/**
 * 展开子菜单时，监听 openKeys，存入 preOpenKeys，用于折叠侧边栏再展开时复原之前的展开菜单
 */
watch(openKeys, (value, oldValue) => {
  preOpenKeys.value = oldValue
})
/**
 * 折叠菜单时，不展开子菜单
 */
watch(collapsed, value => {
  openKeys.value = value ? [] : preOpenKeys.value
})

/**
 * 点击菜单跳转路由
 */
const handleClickMenu = (menuInfo: { key: RouteRecordName }) => {
  router.push({ name: menuInfo.key })
}

/**
 * 动态设置 sidebar 的宽度
 */
useCssVars(() => ({
  sidebarWidth: collapsed.value ? '80px' : '200px',
}))
</script>
<style lang="scss" scoped>
.ant-menu-dark.ant-menu-root.ant-menu {
  height: 100%;
}
.sidebar {
  width: var(--sidebarWidth);
  transition: 0.3s;
  grid-area: sidebar;
}
</style>
