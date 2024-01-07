<script lang="ts" setup>
import { ref, reactive, watch } from "vue"
import { Search, Refresh } from "@element-plus/icons-vue"

import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from "element-plus"

import { addAccountApi, type Account, type AccountData, AccountListApi, deleteAccountApi } from "@/api/ware"

import { useDialog } from "@/hooks/useDialog"
import { usePagination } from "@/hooks/usePagination"
import { el } from "element-plus/es/locale"
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '账密数据'
});

const searchData = reactive({
  content: "",
  wareId: '',
  status: ''
})
const searchFormRef = ref<FormInstance | null>(null)

const handleSearch = () => {
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}

const getTableData = () => {
  const params = {
    ...searchData,
    current: paginationData.currentPage,
    size: paginationData.pageSize,
  }
  AccountListApi(params).then(res => {
    paginationData.total = res.data.total
    tableData.value = res.data.records
  })
}

const tableData = ref<Account[]>([])

const openAccount = (wareId: string) => {
  searchData.wareId = wareId
  getTableData()
  changeVisible(true)
}

const handleDelete = (row: AccountData) => {
  ElMessageBox.confirm(
    '确定删除该数据吗?',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      deleteAccountApi(row.id).then(() => {
        ElMessage.success('删除成功')
        getTableData()
      })
    })
}

defineExpose({
  openAccount,
  changeVisible
})

const resetForm = () => {
  searchFormRef.value?.resetFields()
}
const handleCreate = () => {}

watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData)
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    @close="handleClose(resetForm)"
    width="60%"
  >
    <el-form ref="searchFormRef" :inline="true" :model="searchData">
      <el-form-item prop="content" label="内容">
        <el-input v-model="searchData.content" placeholder="请输入" />
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-select v-model="searchData.status" placeholder="请选择" clearable>
          <el-option label="未售" value="NORMAL"></el-option>
          <el-option label="已售" value="DISABLE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
        <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <!-- <el-table-column type="selection" width="50" align="center" /> -->
      <el-table-column type="index" width="80" label="序号" align="center" />
      <el-table-column prop="content" label="账密信息" align="center" />
      <el-table-column prop="status" label="账密状态" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.status == 'DISABLE' ? 'success' : 'info'">{{ scope.row.status == 'DISABLE' ? '已售出' : '未售出' }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="password" label="商品类型描述" align="center" /> -->
      <el-table-column fixed="right" width="80" label="操作" align="center">
        <template #default="scope">
          <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-wrapper">
      <el-pagination
        background
        :layout="paginationData.layout"
        :page-sizes="paginationData.pageSizes"
        :total="paginationData.total"
        :page-size="paginationData.pageSize"
        :currentPage="paginationData.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
</template>  

<style lang="scss" scoped>
.pager-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>