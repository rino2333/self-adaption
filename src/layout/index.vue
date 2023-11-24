<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRoute } from "vue-router";
import DynamicMenu from './DynamicMenu.vue';
import AsideMenu from './AsideMenu.vue';

const route = useRoute();
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return meta.activeMenu
  }
  return path == '/home' || path == "/404"
})

const isCollapse = ref<boolean>(true);
const changeAsideStatsus = (status: boolean) => {
  isCollapse.value = status;
}

</script>

<template>
  <el-container class="layout-container">
    <el-header>
      <DynamicMenu></DynamicMenu>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <AsideMenu @changeAside="changeAsideStatsus"></AsideMenu>
      </el-aside>
      <el-main>
        <!-- <router-view></router-view> -->

        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <div><component :is="Component" /></div>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang='scss'>
.layout-container {
  height: 100%;
  overflow: auto;

  .el-container {
    overflow: auto;
  }

  .el-header {
    height: 6em;
    border-bottom: .1em solid var(--el-menu-border-color);
    padding: 0;
  }
}
</style>