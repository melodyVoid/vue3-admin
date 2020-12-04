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
  grid-template-columns: 200px 1fr;
  grid-template-rows: 64px auto;
  grid-template-areas:
    'logo navbar'
    'sidebar main';
}
</style>
