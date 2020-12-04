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
import { ref, computed, useCssVars, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const collapsed = computed(() => store.state.app.collapsed)

const router = useRouter()
 /**
  * 递归过滤二级菜单及以下的 hidden 掉的路由
  */
const filterHiddenRoutes = (item: RouteRecordRaw) => {
  if (item.meta.hidden) {
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
  .filter(item => item.children?.length > 0)
  // 递归过滤掉 meta.hidden === true 的路由
  .filter(filterHiddenRoutes)
console.log(routes)

/**
 * 高亮当前菜单
 */
const route = useRoute()
const currentRoute = ref<string[]>([])
const openKeys = ref<string[]>([])

watch(() => route.fullPath, () => {
  currentRoute.value = [route.name]
  openKeys.value = [route.matched[0]?.name]
}, { immediate: true })

/**
 * 点击菜单跳转路由
 */
const handleClickMenu = (menuInfo) => {
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
  transition: 0.4s;
}
</style>
