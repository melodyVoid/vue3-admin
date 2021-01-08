<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
      <template #name="{ text, record }">
        <a-input
          v-if="record.editable"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, 'name')"
        ></a-input>
        <span v-else>{{ text }}</span>
      </template>
      <template #customTitle>
        <span><smile-outlined /> Name</span>
      </template>
      <template #age="{text, record}">
        <a-input
          v-if="record.editable"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, 'age')"
        ></a-input>
        <span v-else>{{ text }}</span>
      </template>
      <template #address="{ text, record }">
        <a-input
          v-if="record.editable"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, 'address')"
        ></a-input>
        <span v-else>{{ text }}</span>
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
          <template v-if="record.editable">
            <a @click="handleSave(record.key)">保存</a>
            <a-divider type="vertical" />
            <a @click="handleCancel(record.key)">取消</a>
          </template>
          <a
            v-else
            @click="handleEdit(record.key)"
            :disabled="editingKey === '' ? null : 'disabled'"
            >编辑</a
          >
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            v-if="data.length"
            title="确定要删除该条数据吗？"
            @confirm="handleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
          <a-divider type="vertical"></a-divider>
          <a>更多操作 <down-outlined /></a>
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
    width: '20%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    slots: { customRender: 'age' },
    align: 'center',
    width: '20%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    slots: { customRender: 'address' },
    align: 'center',
    width: '20%',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: { customRender: 'tags' },
    align: 'center',
    width: '20%',
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' },
    align: 'center',
    width: '20%',
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

// 用于编辑表格点击取消时恢复数据
const cachedData = data.value.map(item => ({ ...item }))

const handleDelete = (record: any) => {
  console.log(record)
  data.value = data.value.filter(item => item.key !== record.key)
}

const handleChange = (value: string, key: string, column: string) => {
  const target = data.value.find(item => item.key === key)
  if (target) {
    target[column] = value
  }
}

const editingKey = ref('')
const handleEdit = (key: string) => {
  const target = data.value.find(item => item.key === key)
  if (target) {
    editingKey.value = key
    target.editable = true
  }
}

const handleSave = (key: string) => {
  const target = data.value.find(item => item.key === key)
  const targetCache = cachedData.find(item => item.key === key)
  if (target && targetCache) {
    target.editable = false
    Object.assign(targetCache, target)
  }
  editingKey.value = ''
}

const handleCancel = (key: string) => {
  const target = data.value.find(item => item.key === key)
  const targetCache = cachedData.find(item => item.key === key)
  if (target && targetCache) {
    target.editable = false
    Object.assign(target, targetCache)
  }
  editingKey.value = ''
}
</script>
<style lang="scss" scoped></style>
