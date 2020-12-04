<template>
  <div class="navbar">
    <MenuFoldOutlined
      class="toggle"
      :class="[collapsed ? 'collapsed' : '']"
      @click="toggle"
    />
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

const collapsed = computed<boolean>(() => store.state.app.collapsed)
const toggle = () => store.commit('app/TOGGLE_COLLAPSE')
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
.toggle {
  font-size: 20px;
  cursor: pointer;
  transition: transform ease 0.4s;
}
.collapsed {
  transform: rotate(180deg);
}
</style>
