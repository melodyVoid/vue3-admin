<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
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
          <a-popconfirm
            v-if="data.length"
            title="确定要删除该条数据吗？"
            @confirm="handleDelete(record)"
          >
            <a>Delete</a>
          </a-popconfirm>
          <a-divider type="vertical"></a-divider>
          <a>More actions <down-outlined /></a>
        </span>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle', customRender: 'name' },
    align: 'center',
  },
  { title: 'Age', dataIndex: 'age', key: 'age', align: 'center' },
  { title: 'Address', dataIndex: 'address', key: 'address', align: 'center' },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: { customRender: 'tags' },
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' },
    align: 'center',
  },
]

const data = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    title: '标题',
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
])

const handleDelete = (record: any) => {
  console.log(record)
  data.value = data.value.filter(item => item.key !== record.key)
}
</script>
<style lang="scss" scoped></style>
