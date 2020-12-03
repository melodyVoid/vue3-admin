<template>
  <div>
    <a-menu mode="inline">
      <a-sub-menu v-for="(menu, index) of routes" :key="index">
        <template #title>
          {{ menu?.meta?.title }}
        </template>
        <template v-if="menu.children && menu.children.length > 0">
          <a-sub-menu
            v-for="(submenu, subIndex) of menu.children"
            :key="subIndex"
          >
            <a-menu-item key="2">{{ submenu.meta.title }}</a-menu-item>
          </a-sub-menu>
        </template>

        <a-sub-menu key="sub3" title="Submenu" v-else>
          <a-menu-item key="7">
            Option 7
          </a-menu-item>
          <a-menu-item key="8">
            Option 8
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router.options.routes)
const routes = router.options.routes
</script>
<style lang="scss" scoped></style>
