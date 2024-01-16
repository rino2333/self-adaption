<script setup lang="ts">

</script>

<template>
  <div class="page">
    <header class="flex-align-center">
      <img src="@/assets/images/123.jpg" alt="">
      一个gpt账号自助平台
    </header>

    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background-color: #6ea6f5;
  padding: 16px;
  overflow: auto;
  background-image: url(@/assets/images/bg.jpg);
  background-size: 100% 100%;
}

header {
  color: #1396558a;
  font-weight: bold;

  img {
    width: 50px;
    margin-right: 12px;
  }
}
</style>