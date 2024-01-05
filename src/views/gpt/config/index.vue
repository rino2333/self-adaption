<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { Search, Refresh, CirclePlus, Delete, RefreshRight, Plus } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useDialog } from "@/hooks/useDialog"

import { type WareTypeForm, type WareTypeData, treeApi, enableApi } from "@/api/ware-type"
import { type ConfigForm, listApi, addApi, editApi, detailApi, deleteApi, CategoryEnum } from "@/api/config";

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '新增配置'
});

interface ZfForm {
  APPID: string
  PRIVATE_KEY: string
  ALIPAY_PUBLIC_KEY: string
  api_key: string
  NOTIFY_URL: string
  RETURN_URL: string
}

//#region 增
// const visible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formModel = ref<any>({
  category: 'ALIPAY',
  APPID: '',
  PRIVATE_KEY: '',
  ALIPAY_PUBLIC_KEY: '',
  api_key: '',
  NOTIFY_URL: '',
  RETURN_URL: ''
})
const formRules: FormRules = reactive({
  category: [{ required: true, trigger: "change", message: "请选择配置类型" }],
  APPID: [{ required: true, trigger: "blur", message: "请输入APPID" }],
  PRIVATE_KEY: [{ required: true, trigger: "blur", message: "请输入PRIVATE_KEY" }],
  ALIPAY_PUBLIC_KEY: [{ required: true, trigger: "blur", message: "请输入ALIPAY_PUBLIC_KEY" }],
  api_key: [{ required: true, trigger: "blur", message: "请输入api_key" }],
  NOTIFY_URL: [{ required: true, trigger: "blur", message: "请输入NOTIFY_URL" }],
  RETURN_URL: [{ required: true, trigger: "blur", message: "请输入RETURN_URL" }],
})

const handleCreate = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        addApi({
          details: JSON.stringify(formModel.value),
          category: formModel.value.category
        }).then(() => {
          ElMessage.success("新增成功")
          changeVisible(false);
          getTableData()
        })
      } else {
        editApi({
          id: currentUpdateId.value,
          details: JSON.stringify(formModel.value),
          category: formModel.value.category
        }).then(() => {
          ElMessage.success("修改成功")
          changeVisible(false);
          getTableData()
        })
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  setDialogTitle('新建类别');
  formRef.value?.resetFields()
  currentUpdateId.value = undefined
}
//#endregion

//#region 删
const multipleSelection = ref<WareTypeData[]>([])
const handleSelectionChange = (val: WareTypeData[]) => {
  multipleSelection.value = val
}
const handleDelete = (row: WareTypeData) => {
  let ids = ''
  if (row.id) {
    ids = row.id
  } else {
    ids = multipleSelection.value.map(item => item.id).join(',')
    if (!ids) {
      ElMessage.warning('至少勾选一项')
      return
    }
  }
  ElMessageBox.confirm(`确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteApi(ids).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: WareTypeData) => {
  if (row.id) {
    setDialogTitle('修改商品类别');
    currentUpdateId.value = row.id
    detailApi(row.id).then(res => {
      formModel.value = {
        ...res.data,
        ...JSON.parse(res.data.details)
      }
    })
    changeVisible(true);
  }
}
//#endregion

//#region 查
const tableData = ref<WareTypeData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  phone: ""
})
const getTableData = () => {
  loading.value = true
  listApi()
    .then((res) => {
      paginationData.total = res.data.total
      tableData.value = res.data;
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
const handleRefresh = () => {
  getTableData()
}

const handleEnable = (row: WareTypeData) => {
  console.log(row.status);
  
  const params = {
    id: row.id,
    status: row.status
  }
  enableApi(params).then(() => {
    getTableData()
  })
}

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="name" label="配置类型">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="visible = true">新增配置</el-button>
          <!-- <el-button type="danger" :icon="Delete" @click="handleDelete">批量删除</el-button> -->
        </div>
        <div>
          <el-tooltip content="刷新表格">
            <el-button type="primary" :icon="RefreshRight" circle @click="handleRefresh" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="id" label="id" align="center" />
          <el-table-column prop="category" label="配置类型" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="NORMAL"
                inactive-value="DISABLE"
                @change="handleEnable(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
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
    <!-- 新增/修改 -->
    <el-dialog
      v-model="visible"
      :title="title"
      @close="handleClose(resetForm)"
      width="60%"
    >
      <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="160px" label-position="left">
        <el-form-item prop="category" label="配置类型">
          <el-select v-model="formModel.category" placeholder="请选择">
            <el-option v-for="item in CategoryEnum" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="APPID" label="APPID">
          <el-input v-model="formModel.APPID" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="PRIVATE_KEY" label="PRIVATE_KEY">
          <el-input v-model="formModel.PRIVATE_KEY" type="textarea" :rows="3" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="ALIPAY_PUBLIC_KEY" label="ALIPAY_PUBLIC_KEY">
          <el-input v-model="formModel.ALIPAY_PUBLIC_KEY" type="textarea" :rows="3" placeholder="请输入" />
        </el-form-item>
        <!-- <el-form-item prop="api_key" label="api_key">
          <el-input v-model="formModel.api_key" placeholder="请输入" />
        </el-form-item> -->
        <el-form-item prop="NOTIFY_URL" label="NOTIFY_URL">
          <el-input v-model="formModel.NOTIFY_URL" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="RETURN_URL" label="RETURN_URL">
          <el-input v-model="formModel.RETURN_URL" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
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
