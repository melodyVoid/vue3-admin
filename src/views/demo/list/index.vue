<template>
  <div>
    dddddd
    <a-input v-model:value="foo"></a-input>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const foo = ref<string>('foo')
</script>
<style lang="scss" scoped></style>
