<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/table"
import { type IGetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useDialog } from "@/hooks/useDialog"

// import "@/mock/index.ts";
// defineOptions({
//   name: "ElementPlus"
// })

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '新增用户'
});

//#region 增
// const visible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const model = reactive({
  username: "",
  password: ""
})
const formRules: FormRules = reactive({
  username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }]
})

/** 监听分页参数的变化 */
// watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
interface Props {
  config: {
    formItems: {
      label: string,
      prop: string,
      clearabled?: boolean
    }[]
  }
}
// withDefaults(defineProps<Props>())

withDefaults(defineProps<Props>(), {
  config: () => {
    formItems: () => [
      { label: '123', vaue: '123' }
    ]
  }
});
</script>

<template>
  <div class="app-container">
    <el-form ref="searchFormRef" :inline="true" :model="model">
      <el-form-item v-for="item in config.formItems" :prop="item.prop" :label="item.label">
        <el-input v-model="item.prop" placeholder="请输入" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
        <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>

</style>
