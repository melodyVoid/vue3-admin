<template>
  <div class="navbar">
    <MenuFoldOutlined
      class="toggle"
      :class="[collapsed ? 'collapsed' : '']"
      @click="toggle"
    />
    <a-breadcrumb>
      <a-breadcrumb-item
        v-for="routeItem of [home, ...routeMatched]"
        :key="routeItem.name"
      >
        <a v-if="routeItem?.children?.length > 0">{{
          routeItem?.meta?.title
        }}</a>
        <span v-else>{{ routeItem?.meta?.title }}</span>
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
    </a-breadcrumb>
    <div class="nav-right">
      <!-- 全屏 -->
      <a :title="isFullscreen ? '取消全屏' : '全屏'" class="a-icon">
        <FullscreenExitOutlined @click="toggleFullscreen" v-if="isFullscreen" />
        <FullscreenOutlined @click="toggleFullscreen" v-else />
      </a>
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
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import useFullscreen from '@/hooks/useFullscreen'

import {
  MenuFoldOutlined,
  DownOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue'

const store = useStore()
const userName = computed<string>(() => store.state.user.userInfo.name)

const collapsed = computed<boolean>(() => store.state.app.collapsed)
const toggle = () => store.commit('app/TOGGLE_COLLAPSE')

// 跳转路由
const router = useRouter()
const goto = (path: string) => router.push(path)

// 面包屑
const route = useRoute()
const routeMatched = computed(() => route.matched)
const rootRoutes = router.options.routes
  .filter(item => item?.children?.length ?? 0 > 0)
  .filter(item => !item?.meta?.hidden)
// 面包屑第一项
const home = {
  name: rootRoutes[0]?.name,
  meta: { title: '首页' },
  children: rootRoutes,
}

// 退出登录
const handleLogout = () => store.dispatch('user/Logout')

// 全屏切换
const { isFullscreen, toggleFullscreen } = useFullscreen()
</script>
<style lang="scss" scoped>
.navbar {
  padding: 0 20px;
  display: grid;
  grid-template-columns: 30px auto 200px;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
.nav-right {
  justify-self: end;
  display: flex;
  align-items: center;
  .anticon {
    cursor: pointer;
  }
  .a-icon {
    color: #2c3e50;
  }
}
.user-info {
  display: flex;
  margin-left: 10px;
  align-items: center;
  .username {
    margin-right: 5px;
  }
}
.toggle {
  font-size: 20px;
  cursor: pointer;
  transition: transform ease 0.3s;
  width: 20px;
}
.collapsed {
  transform: rotate(180deg);
}
.link {
  padding: 0 10px;
}
</style>
