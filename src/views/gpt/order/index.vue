<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import type { FormInstance } from 'element-plus'
import { Search, Refresh } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"

import { listApi, OrderEnum, type OrderData } from "@/api/order";

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 查
const tableData = ref<OrderData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  status: ''
})
const getTableData = () => {
  loading.value = true
  listApi({
    current: paginationData.currentPage,
    size: paginationData.pageSize,
    ...searchData
  })
    .then((res) => {
      paginationData.total = res.data.total
      tableData.value = res.data.records;
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
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

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="name" label="商品名称">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="status" label="支付状态">
          <el-select v-model="searchData.status" placeholder="请选择">
            <el-option v-for="item in Object.keys(OrderEnum)" :label="OrderEnum[item as keyof typeof OrderEnum]" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never" class="fill-table">
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="index" width="80" label="序号" align="center" />
          <el-table-column prop="name" label="商品名称" align="center" />
          <el-table-column prop="no" label="订单号" align="center" />
          <el-table-column prop="amount" label="金额" width="100" align="center">
            <template #default="scope">
              <el-tag>￥{{ scope.row.amount }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100" align="center">
            <template #default="scope">
              <el-tag :type="scope.row.status === 'PAID' ? 'success' : 'warning'">{{ (OrderEnum as Record<string, string>)[scope.row.status] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="payTime" label="支付时间" align="center" />
          <el-table-column prop="createTime" label="创建时间" align="center" />
        </el-table>
      </div>
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
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
