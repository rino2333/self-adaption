<script lang="ts" setup>
import ErrorPageLayout from "./components/ErrorPageLayout.vue"
import Svg404 from "@/assets/images/123.jpg" // vite-svg-loader 插件的功能
</script>

<template>
  <ErrorPageLayout>
    <img :src="Svg404" alt="" srcset="">
  </ErrorPageLayout>
</template>
