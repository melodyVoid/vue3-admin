<template>
  <div>
    <a-menu mode="inline" theme="dark">
      <MenuItem v-for="menu of routes" :key="menu.name" :menu="menu"></MenuItem>
    </a-menu>
  </div>
</template>
<script setup>
import MenuItem from './MenuItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router.options.routes)
// 过滤掉登录页等其他 layout 之外的路由
const routes = router.options.routes.filter(
  item => item.children && item.children.length > 0
)
</script>
<style lang="scss" scoped>
.ant-menu-dark.ant-menu-root.ant-menu {
  height: 100%;
}
</style>
