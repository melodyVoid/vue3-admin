<template>
  <div class="container">
    首页
    <div class="text-lg bg-blue-500">HelloWorld</div>
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
