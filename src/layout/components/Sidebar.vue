<template>
  <div>
    <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed">
      <MenuItem v-for="menu of routes" :key="menu.name" :menu="menu"></MenuItem>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'

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
const collapsed = ref<boolean>(false)
</script>
<style lang="scss" scoped>
.ant-menu-dark.ant-menu-root.ant-menu {
  height: 100%;
}
</style>
