<template>
  <div class="layout">
    <Logo></Logo>
    <Navbar></Navbar>
    <div class="sidebar">sidebar</div>
    <Main></Main>
  </div>
</template>
<script setup>
import Logo from './components/Logo.vue'
import Navbar from './components/Navbar.vue'
import Main from './components/Main.vue'
</script>
<style lang="scss" scoped>
.layout {
  // background: red;
  height: 100vh;
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 64px auto;
  grid-template-areas:
    'logo navbar'
    'sidebar main';
}
</style>
