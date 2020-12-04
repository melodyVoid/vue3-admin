<template>
  <main>
    <div class="main-router-view">
      <router-view></router-view>
    </div>
    <Footer />
  </main>
</template>
<script setup lang="ts">
import Footer from './Footer.vue'
</script>
<style lang="scss" scoped>
main {
  background: #f0f2f5;
  padding: 20px;
  /* 固定 navbar */
  overflow-y: scroll;
}
.main-router-view {
  background: #fff;
  padding: 20px;
}
</style>
