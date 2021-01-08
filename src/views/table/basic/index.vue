<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <template #name="{ text }">
        <span>{{ text }}</span>
      </template>
      <template #customTitle>
        <span><smile-outlined /> Name</span>
      </template>
      <template #tags="{ text: tags }">
        <span>
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
            >{{ tag.toUpperCase() }}</a-tag
          >
        </span>
      </template>
      <template #action="{ record }">
        <span>
          <a> Invite - {{ record.name }}</a>
          <a-divider type="vertical"></a-divider>
          <a>Delete</a>
          <a-divider type="vertical"></a-divider>
          <a>More actions <down-outlined /></a>
        </span>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle', customRender: 'name' },
  },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: { customRender: 'tags' },
  },
  { title: 'Action', key: 'action', slots: { customRender: 'action' } },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]
</script>
<style lang="scss" scoped></style>
