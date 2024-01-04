<script lang="ts" setup>
import { ref, reactive } from "vue"
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from "element-plus"

import { addAccountApi, type Account,  } from "@/api/ware"

import { useDialog } from "@/hooks/useDialog"

const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '新增账密'
});

const formModel = ref<Account>({
  content: '',
  wareId: ''
})

const formRules: FormRules = reactive({
  content: [{ required: true, trigger: "blur", message: "请输入内容" }],
})

const openAccount = (id: string) => {
  formModel.value.wareId = id
  changeVisible(true)
}

defineExpose({
  openAccount,
  changeVisible
})

const formRef = ref()
const handleCreate = () => {
  // const formData = new FormData()
  // for (let key in  formModel.value) {
  //   formData.append(key, formModel.value[key as keyof Account])
  // }
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      const formData = new FormData()
      for (const key in formModel.value) {
        formData.append(key, formModel.value[key as keyof Account])
      }
      addAccountApi(formData).then(res => {
        console.log(res);
        ElMessage.success('添加成功')
        resetForm()
      })
    }
  })
}

const resetForm = () => {
  changeVisible(false)
  formRef.value.resetFields()
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    @close="handleClose(resetForm)"
    width="30%"
  >
    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="100px" label-position="left">
      <el-form-item prop="content" label="内容">
        <el-input v-model="formModel.content" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
</template>  