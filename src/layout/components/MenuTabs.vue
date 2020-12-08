<template>
  <div class="menu-tabs">
    <a-tabs v-model:activeKey="activeKey" type="editable-card" hide-add>
      <a-tab-pane
        v-for="item of panes"
        :key="item.key"
        :tab="item.title"
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const panes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
]
const activeKey = ref<string>('1')
</script>
<style lang="scss" scoped>
.menu-tabs {
  grid-area: tabs;
  padding: 0 20px;
  align-self: end;
  ::v-deep(.ant-tabs-bar.ant-tabs-top-bar.ant-tabs-card-bar) {
    margin-bottom: 0;
  }
}
</style>
