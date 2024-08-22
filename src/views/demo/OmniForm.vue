<script setup lang="ts">
import { ref, reactive } from 'vue'

export type Value = string | number | boolean 
type Component = 'el-input' | 'el-select'| 'el-date-picker' 

interface Option {
  label: string; 
  value: Value
}

export interface FormField {
  prop: string;
  label: string;
  type: Component;
  options?: Option[];
  attrs?: Record<string, any>;
}

type FormMode = 'query' | 'submit'

const emit = defineEmits(['onQuery'])
const formModel = defineModel<Record<string, Value>>({ 
  required: false,
  default: {} 
})

const props = withDefaults(defineProps<{
  formFields: FormField[];
  mode?: FormMode
}>(), {
  mode: 'query'
})

const handleQuery = () => {
  emit('onQuery')
}

const formRef = ref()
const handleReset = () => {
  resetFields()
  handleQuery()
}

const resetFields = () => {
  formRef.value.resetFields()
}

defineExpose({
  resetFields
})

</script>

<template>
  <el-form 
    :model="formModel"
    ref="formRef"
    :inline="props.mode == 'query'"
  >
    <el-form-item 
      v-for="field in props.formFields"
      :label="field.label"
      :prop="field.prop"
    >
      <component 
        :is="field.type" 
        v-model="formModel[field.prop]"
        v-bind="field.attrs"
      >
        <template v-if="field.options && field.type === 'el-select'" #default>
          <el-option
            v-for="option in field.options"
            :label="option.label"
            :value="option.value"
          />
        </template>
      </component>
    </el-form-item>
    <el-form-item v-if="props.mode == 'query'">
      <el-button icon="search" type="primary" @click="handleQuery">
        查询
      </el-button>
      <el-button icon="Refresh" @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>