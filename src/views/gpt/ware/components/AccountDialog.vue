<script lang="ts" setup>
import { ref, reactive } from "vue"
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from "element-plus"

import { addAccountApi, type Account, AccountListApi } from "@/api/ware"

import { useDialog } from "@/hooks/useDialog"

const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '账密数据'
});

const tableData = ref<Account[]>([])

const openAccount = (wareId: string) => {
  AccountListApi({  wareId }).then(res => {
    console.log(res);
    tableData.value = res.data.records
  })
  changeVisible(true)
}

defineExpose({
  openAccount,
  changeVisible
})

const resetForm = () => {}
const handleCreate = () => {}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    @close="handleClose(resetForm)"
    width="60%"
  >
  <el-table :data="tableData">
    <!-- <el-table-column type="selection" width="50" align="center" /> -->
    <el-table-column prop="loginName" label="商品类型名称" align="center" />
    <el-table-column prop="password" label="商品类型描述" align="center" />
    <el-table-column fixed="right" label="操作" align="center">
      <template #default="scope">
        <!-- <el-button type="primary" text bg size="small" @click="handleAddAccount(scope.row)">新增账密信息</el-button>
        <el-button type="primary" text bg size="small" @click="handleAddAccount(scope.row)">查看账密信息</el-button>
        <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
        <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
</template>  