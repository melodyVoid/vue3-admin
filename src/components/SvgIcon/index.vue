<template>
  <svg :class="className" class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'

interface IconProps {
  name: string
  className?: string
}
const props = defineProps<{
  name: string
  className?: string
}>()

const iconName = computed(() => `#icon-${props.name}`)
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  font-size: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
