<template>
  <template v-if="menu.children && menu.children.length > 0">
    <a-sub-menu>
      <template #title>
        <SvgIcon
          :name="menu?.meta?.icon ?? 'default'"
          className="anticon"
          v-if="menu?.meta?.icon"
        ></SvgIcon>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <MenuItem
        :menu="submenu"
        v-for="submenu of menu.children"
        :key="submenu.name"
      ></MenuItem>
    </a-sub-menu>
  </template>
  <a-menu-item v-else :key="menu.name">
    <!-- <SvgIcon :name="menu?.meta?.icon ?? 'default'"></SvgIcon> -->
    <span>{{ menu.meta?.title }}</span>
  </a-menu-item>
</template>
<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { defineProps } from 'vue'
import { PieChartOutlined, MailOutlined } from '@ant-design/icons-vue'

import SvgIcon from '@/components/SvgIcon/index.vue'

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
