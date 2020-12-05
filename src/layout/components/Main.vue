<template>
  <main>
    <a-spin :spinning="spinning" tip="加载中..." size="large">
      <div class="main-router-view">
        <router-view></router-view>
      </div>
      <Footer />
    </a-spin>
  </main>
</template>
<script setup lang="ts">
import Footer from './Footer.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const spinning = computed(() => store.state.app.spinning)
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
