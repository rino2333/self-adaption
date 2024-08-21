<script setup lang="ts">
import request from "/@/utils/request"

interface Slot {
  name: string
  callback: (row: TableColumn) => void
}

export interface TableColumn {
  label: string
  prop?: string
  width?: string
  slots?: Slot[]
}

export interface Pagination {
  pageSizes?: number[]
  layout?: string
}

export interface TableConfig {
  columns: TableColumn[],
	pagination?: {
		pageSizes?: number[]
		layout?: string
	}
}

const props = withDefaults(defineProps<{
  api: string;
  columns: TableColumn[];
  pagination: Pagination;
}>(), {
  api: '', // 默认值为空字符串
  pagination: () => ({ // 可选部分，如果你需要默认值，可以提供
    pageSizes: [10, 20, 30, 50],
    layout: 'total, sizes, prev, pager, next, jumper'
  })
});
console.log(props);

const page = reactive({
  current: 1,
	size: 10,
	total: 0,
	pageSizes: [1, 10, 20, 50, 100, 200],
	layout: 'total, sizes, prev, pager, next, jumper',
})

const data = ref([])
const fetchList = (query?: Object) => {
  request({
    url: props.api,
    method: 'get',
    params: query
  }).then(res => {
    data.value = res.data.records
		page.total = res.data.total
  })
}
fetchList()

const handleSizeChange = () => {}
const handleCurrentChange = () => {}

</script>

<template>
  <el-table :data="data" border>
    <template v-for="item in props.columns">
      <el-table-column v-if="!item.slots" :prop="item.prop" :label="item.label" :width="item.width" show-overflow-tooltip/>
      <el-table-column v-else :label="item.label" :width="item.width">
      <template #default="{ row }">
        <el-button v-for="btn in item.slots" text type="primary"  @click="btn.callback(row)">{{ btn.name }}</el-button>
      </template>
    </el-table-column>
    </template>
  </el-table>
  <el-pagination
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:pager-count="5"
		:page-sizes="page.pageSizes"
		:current-page="page.current"
		background
		:page-size="page.size"
		:layout="page.layout"
		:total="page.total"
	>
	</el-pagination>
</template>

<style scoped lang="scss">

</style>