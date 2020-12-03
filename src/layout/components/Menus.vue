<template>
  <a-menu-item v-for="(menu, index) of routes" :key="index">
    <span>{{ menu?.meta?.title }}</span>
  </a-menu-item>
</template>
<script lang="ts"></script>
<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  routes: {
    type: Array as PropType<Array<RouteRecordRaw>>,
    default: () => [],
  },
})
</script>
<style lang="scss" scoped></style>
