<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view">

      <OmniTable 
        api="/adult/school/page" 
        :columns="tableColumns" 
        :pagination="{layout: 'total'}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import OmniTable, { TableColumn, TableConfig } from './OmniTable.vue'

const handleAdd = (row: TableColumn) => {
  console.log(row);
  
  console.log(1);
}
const handleDel = () => {
  console.log(2);
}
const handleDetail = () => {
  console.log(3);
}

const tableColumns = reactive<TableColumn[]>([
  { label: '批次', prop: 'code' },
  { label: '教学点', prop: 'name' },
  { label: '准考证', prop: 'eduleveles' },
  { label: '姓名', prop: 'contacts' },
  { label: '身份证', prop: 'contactsPhone' },
  { label: '专业', prop: 'address' },
  { label: '课程', prop: 'address' },
  { label: '缴费状态', prop: 'address' },
  { label: '审核状态', prop: 'address' },
  { 
    label: '操作',
    width: '100',
    slots: [
      { name: '删除', callback: handleDel },
    ]
  },
])
</script>