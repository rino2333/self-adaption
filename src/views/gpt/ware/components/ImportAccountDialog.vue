<script lang="ts" setup>
import { ref, reactive } from "vue"
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from "element-plus"
import { importAccountApi } from "@/api/ware"
import { useDialog } from "@/hooks/useDialog"

const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '导入账密'
});

interface ImportAccount {
  wareId: string
  file: File | null
}
const model = ref<ImportAccount>({
  wareId: '',
  file: null
})

const handleCreate = () => {
  console.log(model.value.file instanceof File);
  
  if (model.value.file instanceof File) {
    const formData = new FormData()
    for (const key in model.value) {
      if (key === 'file') {
        const file = model.value[key];
        if (file instanceof File) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, model.value[key as keyof ImportAccount] as string);
      }
    }
    importAccountApi(formData).then(() => {
      ElMessage.success('上传成功')
      resetForm()
    })
  } else {
    ElMessage.error('还未上传文件')
  }
}

const fileChange: UploadProps['onChange'] = (uploadFile) => {
  console.log(uploadFile.raw);
  model.value.file = uploadFile.raw as File
}

const openAccount = (wareId: string) => {
  model.value.wareId = wareId
  changeVisible(true)
}

defineExpose({
  openAccount,
})

const uploadRef = ref()
const resetForm = () => {
  model.value.file = null
  changeVisible(false)
  uploadRef.value.clearFiles()
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    @close="handleClose(resetForm)"
    width="60%"
  >
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      drag
      action="#"
      :auto-upload="false"
      :on-change="fileChange" 
      multiple
      :limit="1"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        文件拖拽至此或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip" style="color: red;">
          注意上传文件后缀为.xls
        </div>
      </template>
    </el-upload>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
</template>  