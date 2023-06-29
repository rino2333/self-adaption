<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import LayoutView from "./layout/index.vue";
// import { login } from "./api/login";

// const handlelogin = async () => {
//   const params = {
//     username: '018411111111',
//     password: '690898',
//     type: 'STUDENT'
//   }
//   const res = await login(params);
//   console.log(res);
// };

// handlelogin();


</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/123.jpg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="/123.jpg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <HelloWorld msg="self-adaption" /> -->
  <el-config-provider :locale="zhCn">
    <!-- <LayoutView />  -->
    <router-view />
  </el-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
