<template>
  <div class="error-wrapper">
    <SvgIcon name="403" className="error403"></SvgIcon>
    <p>抱歉，您没有当前页面的权限。请联系管理员。</p>
    <a-button type="primary" @click="goBack">返回</a-button>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index'
import useGoBack from '@/hooks/useGoBack'
const { goBack } = useGoBack()
</script>
<style lang="scss" scoped>
.error-wrapper {
  // background: #f0f2f5;
  // 22px 是 footer 高度
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 82px);
  .error403 {
    width: 500px;
    height: 230px;
  }
}
</style>
