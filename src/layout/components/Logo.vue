import { computed } from 'vue';
<template>
  <div class="logo">
    {{ collapsed ? 'Vue3' : 'Vue3-Admin' }}
  </div>
</template>
<script setup lang="ts">
import { computed, useCssVars } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const collapsed = computed(() => store.state.app.collapsed)
/**
 * 动态设置 sidebar 的宽度
 */
useCssVars(() => ({
  sidebarWidth: collapsed.value ? '80px' : '200px',
}))
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  // border-bottom: 1px solid #f6f6f6;
  background: #001529;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  width: var(--sidebarWidth);
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  grid-area: logo;
  zoom: 1;
}
</style>
