type FormSize = 'large' | 'default' | 'small'
type ItemType = 'text' | 'password' | 'textarea' | 'select'

interface ItemOption {
  label: string
  value: string | number
}

export interface FormItem {
  type: ItemType,
  label: string,
  prop: string,
  options?: ItemOption[],
  clearable?: boolean
}

export interface FormConfig {
  inline: boolean
  size: FormSize
  formItems: FormItem[]
}