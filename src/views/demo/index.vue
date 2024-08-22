<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'

import OmniTable from './OmniTable.vue'
import type { TableColumn } from './OmniTable.vue'
import OmniForm from './OmniForm.vue' 
import type { FormField } from './OmniForm.vue' 


const handleDel = () => {
  console.log(2);
}
const handleEdit = (row: TableColumn) => {
  const data = {
    id: '123',
    name: '章三',
    gender: 'male',
    date: '2000-08-08',
  }
  Object.assign(formData2, data)
  isEdit.value = true
  visible.value = true
}

const formData = reactive({
  name: '',
  gender: '',
  date: '',
})

const formData2 = reactive({
  id: '',
  name: '',
  gender: '',
  date: '',
})

const formFields = reactive<FormField[]>([
  { label: '用户名', prop: 'name', type: 'el-input' },
  { 
    label: '性别', 
    prop: 'gender', 
    type: 'el-select', 
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
    attrs: {
      placeholder: '请选择性别',
    } 
  },
  { 
    label: '生日', 
    prop: 'date', 
    type: 'el-date-picker',
    attrs: {
      type: 'date',
      placeholder: '请选择日期',
      format: 'YYYY-MM-DD',
      valueFormat: "YYYY-MM-DD"
    }
  },
])

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
      { name: '编辑', callback: handleEdit },
      { name: '删除', callback: handleDel },
    ]
  },
])

const omniTableRef = ref()
const handleQuery = () => {
  omniTableRef.value.fetchList()
}

const submitFormRef = ref()
const isEdit = ref(false)
const visible = ref(false)
const handleAdd = () => {
  nextTick(() => {
    submitFormRef?.value.resetFields()
  })
  isEdit.value = false
  visible.value = true
}
const handleSubmit = () => {
  console.log(formData2);
}
</script>

<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view">
      <OmniForm 
        v-model="formData"
        :form-fields="formFields"
        @on-query="handleQuery"
      />
      <div>
        <el-button plain icon="folder-add" type="primary" @click="handleAdd">新增</el-button>
      </div>
      <OmniTable 
        ref="omniTableRef"
        :query-data="formData"
        api="/adult/school/page" 
        :columns="tableColumns" 
        :pagination="{layout: 'total'}"
      />

      <el-dialog
        :title="isEdit ? '编辑' : '新增'"
        v-model="visible"
        :close-on-click-modal="false"
        draggable
      >
        <OmniForm 
          ref="submitFormRef"
          v-model="formData2"
          mode="submit"
          :form-fields="formFields"
          @on-query="handleQuery"
        />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>