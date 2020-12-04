<template>
  <div class="sidebar">
    <a-menu
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      v-model:selectedKeys="currentRoute"
      @click="handleClickMenu"
    >
      <MenuItem v-for="menu of routes" :key="menu.path" :menu="menu"></MenuItem>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ref, computed, useCssVars } from 'vue'
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
const routes = router.options.routes
  // 过滤掉登录页等其他 layout 之外的路由
  .filter(item => item.children?.length > 0)
  // 递归过滤掉 meta.hidden === true 的路由
  .filter(filterHiddenRoutes)
console.log(routes)

const currentRoute = ref([])
const handleClickMenu = (menuInfo) => {
  // keyPath 的格式：["basic", "/table"]，这个用 ... 把数组拷贝了一份避免 reverse 修改原数组，产生副作用
  const path = [...menuInfo.keyPath].reverse().join('/')
  router.push({ path })
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
