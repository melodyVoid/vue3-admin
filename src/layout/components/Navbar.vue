<template>
  <div class="navbar">
    <MenuFoldOutlined
      class="toggle"
      :class="[collapsed ? 'collapsed' : '']"
      @click="toggle"
    />
    <a-breadcrumb>
      <template v-for="routeItem of routeMatched" :key="routeItem.name">
        <a-breadcrumb-item>
          <a>{{ routeItem?.meta?.title }}</a>
          <template #overlay v-if="routeItem?.children?.length > 0">
            <a-menu>
              <a-menu-item
                v-for="item of routeItem.children.filter(i => !i?.meta?.hidden)"
                :key="item.name"
              >
                <router-link :to="{ name: item.name }">{{
                  item?.meta?.title
                }}</router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>
    <a-dropdown>
      <div class="user-info">
        <div class="avatar">
          <a-avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </div>
        <div class="username">{{ userName }}</div>
        <DownOutlined />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <div class="link" @click="goto('/home')">
              <DashboardOutlined /> 首页
            </div>
          </a-menu-item>
          <a-menu-item key="1">
            <div class="link" @click="goto('/account/settings')">
              <SettingOutlined /> 个人设置
            </div>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <div class="link" @click="handleLogout">
              <LogoutOutlined /> 退出登录
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
import {
  MenuFoldOutlined,
  DownOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const store = useStore()
const userName = computed<string>(() => store.state.user.userInfo.name)

const collapsed = computed<boolean>(() => store.state.app.collapsed)
const toggle = () => store.commit('app/TOGGLE_COLLAPSE')

// 面包屑
const route = useRoute()
const routeMatched = computed(() => route.matched)
// 跳转路由
const router = useRouter()
const goto = (path: strting) => router.push(path)

// 退出登录
const handleLogout = () => store.dispatch('user/Logout')
</script>
<style lang="scss" scoped>
.navbar {
  padding: 0 20px;
  display: grid;
  grid-template-columns: 40px auto 200px;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
.user-info {
  display: flex;
  align-items: center;
  justify-self: end;
  .username {
    margin-right: 5px;
  }
}
.toggle {
  font-size: 20px;
  cursor: pointer;
  transition: transform ease 0.4s;
}
.collapsed {
  transform: rotate(180deg);
}
.link {
  padding: 0 10px;
}
</style>
