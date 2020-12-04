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
import { ref } from 'vue'

const router = useRouter()
console.log(router.options.routes)
// 过滤掉登录页等其他 layout 之外的路由
const routes = router.options.routes.filter(
  item => item.children && item.children.length > 0
)
const collapsed = ref<boolean>(false)
</script>
<style lang="scss" scoped>
.ant-menu-dark.ant-menu-root.ant-menu {
  height: 100%;
}
</style>
