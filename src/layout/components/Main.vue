<template>
  <main>
    <a-spin :spinning="spinning" tip="加载中..." size="large">
      <div class="main-router-view">
        <a-spin :spinning="!routerViewActive" size="large">
          <router-view :key="routerViewActive"></router-view>
        </a-spin>
      </div>
      <Footer />
    </a-spin>
  </main>
</template>
<script setup lang="ts">
import Footer from './Footer.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useReloadRouterView } from '@/hooks/useReloadRouterView'
const store = useStore()
const spinning = computed(() => store.state.app.spinning)

const { routerViewActive } = useReloadRouterView()
console.log(routerViewActive)
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
