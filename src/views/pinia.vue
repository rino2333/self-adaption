<script setup lang='ts'>
import { ref, reactive, onMounted, watch, withCtx } from 'vue'
import request from "@/utils/service";
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useDialog } from "@/hooks/useDialog"


const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const { visible, changeVisible, title, setDialogTitle, handleClose } = useDialog({
  title: '新增用户'
});

const searchData = ref({
  tel: ''
});
const tableData = ref([]);

const handleSearch = () => {
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
};

const getTableData = () => {
  request({
    method: 'get',
    url: '/myapp/getStudent',
    params: {
      currentPage: paginationData.currentPage,
      size: paginationData.pageSize,
      ...searchData.value
    }
  }).then((res: any) => {
    console.log(res);
    tableData.value = res.data;
    paginationData.total = res.total;
  });
}

onMounted(handleSearch);

  let ws = new WebSocket('ws://localhost:3000/socket/websocket');
  ws.onopen = (e) => {
    console.log('connected');
    ws.send('张三打了李四')
  };
  ws.onmessage = (e) => {
    console.log('收到的消息');
    console.log(e.data);
  };
  ws.onerror = (e) => {
    console.log('close');
  };

const resetSearch = () => {

};

const handleUpdate = (row: any) => {
  setDialogTitle('修改用户');
  formData.value = row
  changeVisible(true);
};

const handleDelete = (id: string) => {
  request({
    url: '/myapp/deleteStudent',
    method: 'post',
    data: { id }
  }).then(res => {
    console.log(res);
  })
};

const resetForm = () => {
  setDialogTitle('新增用户');
  formData.value = {};
};

const formData = ref<any>({});

const handleCreate = () => {
  if (!formData.value.id) {
    request({
      url: '/myapp/insertStudent',
      method: 'post',
      data: formData.value
    });
  } else {
    request({
      url: '/myapp/updateStudent',
      method: 'post',
      data: formData.value
    });
  }
};

watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="searchData.tel" placeholder="请输入" />
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
          <el-button type="primary" :icon="CirclePlus" @click="visible = true">新增用户</el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <!-- <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新表格">
            <el-button type="primary" :icon="RefreshRight" circle @click="handleRefresh" />
          </el-tooltip>
        </div> -->
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="tel" label="手机号" align="center" />
          <el-table-column prop="sex" label="性别" align="center" />
          <el-table-column prop="age" label="年龄" align="center" />
          <el-table-column prop="id" label="id" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row.id)">删除</el-button>
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
      <el-form ref="formRef" :model="formData" label-width="100px" label-position="left">
        <el-form-item prop="name" label="姓名">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="手机号">
          <el-input v-model="formData.tel" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="性别">
          <el-input v-model="formData.sex" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="年龄">
          <el-input v-model="formData.age" placeholder="请输入" />
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
</style>