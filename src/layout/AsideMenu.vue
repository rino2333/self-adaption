<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Fold,
  Expand
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from "vue-router";
import { useRouterStore, type Nav } from '@/store/routerStore'
import { getMenu } from "@/api/login";

const emit = defineEmits<{
  (e: 'changeAside', status: boolean ): void
}>();

onMounted(() => {
  // addRouter(routerStore.nav);
})

const route = useRoute();
const router = useRouter();
const routerStore = useRouterStore();

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const setNav = async () => {
  const nav = [
    {
      path: '/demo1', 
      code: '001', 
      name: '门户平台管理',
      children: [
        {
          path: '/demo1/table2',
          code: '002',
          name: '在线课堂'
        },
        {
          path: '/demo1/table3',
          code: '003',
          name: '课件学习'
        }
      ]
    }
  ];
  routerStore.setNav(nav);

  console.log(routerStore.nav);
  
  if (routerStore.nav.length == 0) {
    const res = await getMenu();
    routerStore.setNav(res.data);
  }
}
setNav();

const addRouter = (data: Nav[]) => {
  data.map(item => {
    if (item.children && item.children.length > 0) {
      addRouter(item.children)
    } else {
      if (item.url) {
        router.addRoute({ path: item.url, component: () => import('@/views/jsp/index.vue') })
      }
    }
  })
}

const changeIcon = () => {
  isCollapse.value = !isCollapse.value;
  emit('changeAside', !isCollapse.value);
}
</script>

<template>
  <el-menu
    :default-active="route.path"
    :collapse="isCollapse"
    router
    unique-opened
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="flex-center icon">
      <el-icon size="24" @click="changeIcon">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
    </div>
    
    <template v-for="(item, index) in routerStore.nav" :key="index">
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.code">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="childItem in item.children" :key="childItem.code">
          <el-sub-menu v-if="childItem.children && childItem.children.length > 0" :index="childItem.code">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ childItem.name }}</span>
            </template>
            <template v-for="childItems in childItem.children" :key="childItems.path" :index="childItems.url">
              <el-sub-menu v-if="childItems.children && childItems.children.length > 0" :index="childItems.code">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>{{ childItems.name }}</span>
                </template>
                <el-menu-item v-for="childItemss in childItems.children" :key="childItemss.path" :index="childItemss.url">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>{{ childItemss.name }}</span>
                  </template>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="childItems.url">
                <el-icon><setting /></el-icon>
                <template #title>{{ childItems.name }}</template>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item v-else :index="childItem.url">
            <el-icon><setting /></el-icon>
            <template #title>{{ childItem.name }}</template>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="item.url">
        <el-icon><setting /></el-icon>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </template>  
  </el-menu>
</template>

<style scoped lang='scss'>
.el-scrollbar {
  height: calc(100vh - 60px);

  :deep(.scrollbar-wrapper) {
    height: 100%;

    .el-scrollbar__view {
      height: 100%;
    }
  }
}
.el-menu {
  min-height: 100%;
  user-select: none;
}

.icon {
  padding: 12px 0;

  i {
    cursor: pointer;
  }
}

.el-menu:not(.el-menu--collapse) {
  width: 240px;
}
</style>