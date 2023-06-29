<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from "vue-router";

defineProps<{ msg: string }>()
const router = useRouter();

const linkTo = (path: string) => {
  router.push({ path });
}

const count = ref(0)
</script>

<template>
  <h1 @click="linkTo('/home')">to home</h1>
  <h1 @click="linkTo('/pinia')">to pinia</h1>
  <el-button>123</el-button>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
  
</template>

<style scoped>

</style>
