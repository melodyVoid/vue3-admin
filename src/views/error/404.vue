<template>
  <div class="error-wrapper">
    <SvgIcon name="404" className="error404"></SvgIcon>
    <p>抱歉，您访问的页面不存在。</p>
    <a-button type="primary" @click="goBack">返回</a-button>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import useGoBack from '@/hooks/useGoBack'
const { goBack } = useGoBack()
</script>
<style lang="scss" scoped>
.error-wrapper {
  // background: #f0f2f5;
  // 82px 是 footer 高度
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 82px);
  .error404 {
    width: 500px;
    height: 240px;
    margin-bottom: 20px;
  }
}
</style>
