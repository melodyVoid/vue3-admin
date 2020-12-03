<template>
  <template v-if="menu.children && menu.children.length > 0">
    <a-sub-menu
      v-for="submenu of menu.children"
      :key="submenu.name"
      :title="menu.meta?.title"
    >
      <MenuItem :menu="submenu"></MenuItem>
    </a-sub-menu>
  </template>
  <a-menu-item v-else :key="menu.name">
    <span>{{ menu.meta?.title }}</span>
  </a-menu-item>
</template>
<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  menu: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({
      name: '',
      meta: { title: '' },
      children: [],
    }),
  },
})
</script>
<style lang="scss" scoped></style>
