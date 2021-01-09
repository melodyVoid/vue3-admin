<template>
  <footer>
    <div class="links"></div>
    <div class="copyright">
      Copyright <CopyrightCircleOutlined /> 2020 Vue3-Admin Copyright
    </div>
  </footer>
</template>
<script setup lang="ts">
import { CopyrightCircleOutlined } from '@ant-design/icons-vue'
</script>
<style lang="scss" scoped>
footer {
  margin: 30px 0;
  .copyright {
    text-align: center;
  }
}
</style>
