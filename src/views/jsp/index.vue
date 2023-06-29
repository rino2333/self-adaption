<script setup lang='ts'>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from "vue-router";
import { useRouterStore } from '@/store/routerStore';
import { ElMessage } from "element-plus";

interface IframeResp {
  data: {
    data: string;
    type: 'jumpToPage' | 'noLogin';
  }
}

const route = useRoute();

const routerStore = useRouterStore();

const path = ref<string>('');
const token = localStorage.getItem('token');

const iframeSrc = computed(() => {
  return `${path.value || '/zd-admin' + route.path}?token=${token}`;
});

onMounted(() => {
  window.addEventListener('message', payEvent);
});

watch(() => route.path, () => {
  path.value = '';
});

const payEvent=(event: IframeResp)=> {
  console.log(event);
  
  if (event.data.type == 'jumpToPage') {
    console.log(event.data);
    path.value = event.data.data;
  } else if (event.data.type == 'noLogin') {
    ElMessage.warning('登录已过期，请重新登录');
    routerStore.logout();
  }
};

onUnmounted(() => {
  window.removeEventListener('message', payEvent);
});

</script>

<template>
  <!-- <iframe :src="`/admin_ct/${route.path}?token=${token}`" frameborder="0"></iframe> -->
  <!-- <iframe :src="`/zd-admin/${path ? path : route.path}?token=${token}`" frameborder="0"></iframe> -->
  <iframe :src="iframeSrc" frameborder="0"></iframe>
</template>

<style scoped lang='scss'>
iframe {
  width: 100%;
  height: 100%;
}
</style>