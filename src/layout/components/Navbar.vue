<template>
  <div class="navbar">
    <MenuFoldOutlined :style="{ fontSize: '20px' }" />
    <div class="user-info">
      <div class="avatar">
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </div>
      <div class="username">{{ userName }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const userName = computed<string>(() => store.state.user.userInfo.name)
</script>
<style lang="scss" scoped>
.navbar {
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f6f6f6;
}
.user-info {
  display: flex;
  align-items: center;
}
</style>
