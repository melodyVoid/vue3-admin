<template>
  <div class="login-wrapper">
    <a-form
      layout="vertical"
      :wrapper-col="{ span: 6, offset: 9 }"
      class="login-form"
    >
      <a-form-item name="account" v-bind="validateInfos.account">
        <a-input
          v-model:value="loginForm.account"
          size="large"
          placeholder="请输入账号"
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" v-bind="validateInfos.password">
        <a-input-password
          v-model:value="loginForm.password"
          size="large"
          placeholder="请输入密码"
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button size="large" type="primary" block @click="handleSubmit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import useLogin from './hooks/useLogin'

import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

const { loginForm, validateInfos, handleSubmit } = useLogin()
</script>
<style lang="scss" scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  font-size: 40px;
  margin: 20px 0;
}
.login-form {
  width: 100%;
}
</style>
