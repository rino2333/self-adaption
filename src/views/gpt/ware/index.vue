<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight, Plus } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useDialog } from "@/hooks/useDialog"

import { imgUpload } from "@/api/common";
import { type WareTypeData, type WareTypeTree, treeApi } from "@/api/ware-type"
import { type WareData, type WareForm,listApi, addApi, detailApi, deleteApi, editApi, enableApi } from "@/api/ware"
import { el } from "element-plus/es/locale"
import AccountAddDialog from "./components/AccountAddDialog.vue"
import AccountDialog from "./components/AccountDialog.vue"
import ImportAccountDialog from "./components/ImportAccountDialog.vue"

import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()

const editerCreate = (editor) => {
  console.log('created', editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleNodeClick = (node: WareTypeTree) => {
  console.log(node)
  formModel.value.typeId = node.id
  getTableData()
}

const tree = ref<WareTypeTree[]>([])

const defaultProps = {
  children: 'children',
  label: 'name',
}

treeApi().then(res => {
  console.log(res.data);
  tree.value = res.data
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '新增商品'
});

//#region 增
// const visible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formModel = ref<WareForm>({})
const formRules: FormRules = reactive({
  typeId: [{ required: true, trigger: "change", message: "请选择商品类型" }],
  name: [{ required: true, trigger: "blur", message: "请输入类型名称" }],
  amount: [{ required: true, trigger: "blur", message: "请输入金额" }],
  describe: [{ required: true, trigger: "blur", message: "请输入类型描述" }],
  sort: [{ required: true, trigger: "change", message: "请输入排序值" }],
  logo: [{ required: true, trigger: "change", message: "请上传logo" }],
})

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // formModel.value.logo = URL.createObjectURL(uploadFile.raw!)
  // formModel.value.logo = 'https://jxjy-test.whxunw.com/center/assets/123-3c444361.jpg'
  // console.log(formModel.value);
  // console.log(uploadFile.raw);
  const formData = new FormData()
  formData.append("file", uploadFile.raw as File)
  imgUpload(formData).then(res => {
    console.log(res.data);
    formModel.value.logo = res.data
  })

  
  formRef.value?.validateField('logo')
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  formModel.value.logo = URL.createObjectURL(uploadFile.raw!)
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
        addApi(formModel.value).then(() => {
          ElMessage.success("新增成功")
          changeVisible(false);
          getTableData()
        })
      } else {
        editApi({
          id: currentUpdateId.value,
          ...formModel.value
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
const multipleSelection = ref<WareData[]>([])
const handleSelectionChange = (val: WareData[]) => {
  multipleSelection.value = val
}
const handleDelete = (row: WareData) => {
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
const handleUpdate = (row: WareData) => {
  if (row.id) {
    setDialogTitle('修改商品类别');
    currentUpdateId.value = row.id
    detailApi(row.id).then(res => {
      formModel.value = res.data
    })
    changeVisible(true);
  }
}
//#endregion

//#region 查
const tableData = ref<WareData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  phone: ""
})
const getTableData = () => {
  loading.value = true
  listApi({
    current: paginationData.currentPage,
    size: paginationData.pageSize,
    name: searchData.name,
    typeId: formModel.value.typeId
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

const accountAddRef = ref()
const handleAddAccount = (row: WareData) => {
  accountAddRef.value.openAccount(row.id)
}

const accountRef = ref()
const handleAccount = (row: WareData) => {
  accountRef.value.openAccount(row.id)
}

const importRef = ref()
const handleImportAccount = (row: WareData) => {
  importRef.value.openAccount(row.id)
}

const handleEnable = (row: WareData) => {
  console.log(row.status);
  
  const params = {
    id: row.id,
    status: row.status
  }
  enableApi(params).then(res => {
    console.log(res);
    getTableData()
  })
}

const editorConfig = { 
  placeholder: '请输入内容...',
  MENU_CONF: {                // 配置上传服务器地址
    uploadImage: {
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 5 * 1024, // 5kb
      // 单个文件的最大体积限制，默认为 2M
      // maxFileSize: 1 * 1024 * 1024, // 1M
      // // 最多可上传几个文件，默认为 100
      // maxNumberOfFiles: 5,
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],
      // 自定义上传
      async customUpload(file, insertFn) { // 文件上传
        try {
            console.log(file);
            const formData = new FormData()
            formData.append('file', file)
            imgUpload(formData).then(res => {
              console.log(res.data);
              insertFn(res.data, '', res.data)
              ElMessage({
                type: 'success',
                message: '上传附件成功！',
              })
            })
            
            //更新临时token
            // let urlData = null;
            // //上传
            // let nununu = await S3Demo.putObject(file, config.data.data.bucketName, 'wangeditor').then(function(resolve){
            //     console.log(resolve)
            //     urlData = resolve;
            //     insertFn(urlData, '', urlData)
            //     ElMessage({
            //       type: 'success',
            //       message: '上传附件成功！',
            //     })
            // })
        } catch (e) {
            console.log('222')
            ElMessage.error('上传附件失败！');
        }
         
      }
    }
  }
}

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container flex">
    <el-card shadow="never" class="tree-card">
      <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick" />
    </el-card>
    <div style="width: 80%;" class="flex-column">
      <el-card shadow="never" class="search-wrapper">
        <el-form ref="searchFormRef" :inline="true" :model="searchData">
          <el-form-item prop="name" label="商品类型名称">
            <el-input v-model="searchData.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
            <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card v-loading="loading" shadow="never" class="f-1">
        <div class="toolbar-wrapper">
          <div>
            <el-button type="primary" :icon="CirclePlus" @click="visible = true">新增商品</el-button>
            <el-button type="danger" :icon="Delete" @click="handleDelete">批量删除</el-button>
          </div>
          <div>
            <el-tooltip content="刷新表格">
              <el-button type="primary" :icon="RefreshRight" circle @click="handleRefresh" />
            </el-tooltip>
          </div>
        </div>
        <div class="table-wrapper">
          <el-table :data="tableData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column prop="name" label="商品名称" align="center" />
            <el-table-column prop="amount" label="商品金额" align="center">
              <template #default="scope">
                <el-tag type="success">￥{{ scope.row.amount }}</el-tag>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="describe" label="商品描述" align="center" show-overflow-tooltip>
              <template #default="scope">
                <div v-html="scope.row.describe"></div>
              </template>
            </el-table-column> -->
            <el-table-column prop="typeName" label="商品类型" align="center">
              <template #default="scope">
                <el-tag>{{ scope.row.typeName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="describe" label="logo" align="center">
              <template #default="scope">
                <el-image
                  style="height: 60px;"
                  :src="scope.row.logo"
                  :preview-src-list="[scope.row.logo]"
                />
              </template>
            </el-table-column>
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
            <el-table-column fixed="right" label="操作" width="240" align="center">
              <template #default="scope">
                <el-button type="primary" text bg size="small" @click="handleAddAccount(scope.row)">新增账密</el-button>
                <el-button type="primary" text bg size="small" @click="handleImportAccount(scope.row)">导入账密</el-button>
                <el-button type="primary" text bg size="small" @click="handleAccount(scope.row)">查看账密</el-button>
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
    </div>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="visible"
      :title="title"
      @close="handleClose(resetForm)"
      width="60%"
    >
      <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="typeId" label="商品类型">
          <el-select v-model="formModel.typeId" :placeholder="'请选择'">
            <el-option v-for="option in tree" :label="option.name" :value="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="商品名称">
          <el-input v-model="formModel.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="amount" label="商品金额">
          <el-input v-model="formModel.amount" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="logo" label="商品logo">
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"  
            :show-file-list="false"
            :on-change="handleChange"  
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formModel.logo" :src="formModel.logo" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item prop="describe" label="商品描述">
          <!-- <el-input v-model="formModel.describe" placeholder="请输入" /> -->
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="{}"
              :mode="'default'"
            />
            <Editor
              style="height: 500px; overflow-y: hidden;"
              v-model="formModel.describe"
              :defaultConfig="editorConfig"
              :mode="'default'"
              @onCreated="editerCreate"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>

    <AccountAddDialog ref="accountAddRef"></AccountAddDialog>
    <AccountDialog ref="accountRef"></AccountDialog>
    <ImportAccountDialog ref="importRef"></ImportAccountDialog>
  </div>
</template>

<style lang="scss" scoped>
.tree-card {
  width: 20%;
  margin-right: 12px;
}

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
