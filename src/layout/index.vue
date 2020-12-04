<template>
  <div class="layout">
    <Logo></Logo>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <Main></Main>
  </div>
</template>
<script setup lang="ts">
import Logo from './components/Logo.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Main from './components/Main.vue'
</script>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  display: grid;
  // grid-template-columns 不支持 transition，所以不能动态地改变第一列网格的宽度
  // https://stackoverflow.com/questions/43911880/using-css-transitions-in-css-grid-layout
  // https://stackoverrun.com/cn/q/12177015
  // grid-template-columns: var(--sidebarWidth) 1fr;

  // 加上折叠的过度效果的解决办法是：将第一列的宽度设置为 auto，然后去动态地改变 sidebar 的宽度
  grid-template-columns: auto 1fr;
  grid-template-rows: 64px auto;
  grid-template-areas:
    'logo navbar'
    'sidebar main';
}
</style>
