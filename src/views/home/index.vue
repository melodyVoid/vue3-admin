<template>
  <div class="container">
    首页
    <div class="text-base bg-blue-300 text-white p-2 rounded text-center my-4">
      Hello Vue3 Admin
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const foo = ''
    console.log(foo)
  },
})
</script>
<style lang="scss" scoped>
.container {
  // background: #fff;
  height: 1000px;
}
</style>
