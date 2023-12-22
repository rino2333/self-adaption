<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/table"
import { type IGetTableData } from "@/api/table/types/table"
import { ElMessage, ElMessageBox } from "element-plus"
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight, Plus } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useDialog } from "@/hooks/useDialog"

import { imgUpload } from "@/api/common";
import { type WareTypeData, listApi, addApi, editApi, detailApi, deleteApi, treeApi } from "@/api/ware-type"
// treeApi().then(res => {
//   console.log(res);
  
// })

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '新增类别'
});

//#region 增
// const visible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = ref<WareTypeData>({})
const formRules: FormRules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入类型名称" }],
  describe: [{ required: true, trigger: "blur", message: "请输入类型描述" }],
  sort: [{ required: true, trigger: "blur", message: "请输入排序值" }],
  logo: [{ required: true, trigger: "change", message: "请上传logo" }],
})

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // formData.value.logo = URL.createObjectURL(uploadFile.raw!)
  formData.value.logo = 'https://jxjy-test.whxunw.com/center/assets/123-3c444361.jpg'
  console.log(formData.value);
  
  formRef.value?.validateField('logo')
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  formData.value.logo = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile.type);
  
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const handleCreate = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        addApi(formData.value).then(() => {
          ElMessage.success("新增成功")
          changeVisible(false);
          getTableData()
        })
      } else {
        editApi({
          id: currentUpdateId.value,
          ...formData.value
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
  currentUpdateId.value = undefined
  formData.value = {}
}
//#endregion

//#region 删
const handleDelete = (row: IGetTableData) => {
  ElMessageBox.confirm(`确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: IGetTableData) => {
  setDialogTitle('修改商品类别');
  currentUpdateId.value = row.id
  detailApi(row.id).then(res => {
    console.log(res);
    
    formData.value = res.data
  })
  // visible.value = true
  changeVisible(true);
}
//#endregion

//#region 查
const tableData = ref<WareTypeData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  username: "",
  phone: ""
})
const getTableData = () => {
  loading.value = true
  listApi({
    current: paginationData.currentPage,
    size: paginationData.pageSize,
    name: searchData.username || undefined
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
const handleRefresh = () => {
  getTableData()
}

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="类型">
          <el-input v-model="searchData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="searchData.phone" placeholder="请输入" />
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
          <el-button type="primary" :icon="CirclePlus" @click="visible = true">新增类别</el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="刷新表格">
            <el-button type="primary" :icon="RefreshRight" circle @click="handleRefresh" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="name" label="商品类型名称" align="center" />
          <el-table-column prop="describe" label="商品类型描述" align="center" />
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
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="name" label="类型名称">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="describe" label="类型描述">
          <el-input v-model="formData.describe" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="sort" label="排序">
          <el-input-number v-model="formData.sort" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="logo" label="类型logo">
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"  
            :show-file-list="false"
            :on-change="handleChange"  
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.logo" :src="formData.logo" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
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
