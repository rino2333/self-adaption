<script setup lang='ts'>
import { ref } from 'vue'

const status = ref(true);
setInterval(() => {
  status.value = !status.value;
}, 3000);

</script>

<template>
  <transition name="fade-transform">
    <div v-show="status" class="transition-box">123123</div>    
  </transition>

</template>

<style scoped lang='scss'>
 .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>