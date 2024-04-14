<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

const isShowTip = computed(() => {
  return ['/index', '/detail'].includes(route.path)
})

const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})
</script>

<template>
  <div class="page" :class="{ 'mobile': isMobile }">
    <div class="main">
      <header class="flex-align-center">
        <img src="@/assets/images/liuhu.jpg" alt="" @click="router.push('/')">
        金山（宇宙最强GPT4.0）
      </header>
      <div 
        class="query-m" 
        @click="router.push('/order-search')"
        v-show="isShowTip"
      >
        <svg t="1602926403006" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3391" width="30" height="30">
            <path d="M320.512 428.032h382.976v61.44H320.512zM320.512 616.448h320.512v61.44H320.512z" fill="#ffffff" p-id="3392" data-spm-anchor-id="a313x.7781069.0.i38" class="selected"></path>
            <path d="M802.816 937.984H221.184l-40.96-40.96V126.976l40.96-40.96h346.112l26.624 10.24 137.216 117.76 98.304 79.872 15.36 31.744v571.392l-41.984 40.96z m-540.672-81.92h500.736V345.088L677.888 276.48 550.912 167.936H262.144v688.128z" fill="#ffffff" p-id="3393" data-spm-anchor-id="a313x.7781069.0.i37" class="selected"></path>
        </svg>
        <span>查单</span>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background-color: #6ea6f5;
  padding: 16px;
  overflow: auto;
  // background-image: url(@/assets/images/bg.jpg);

  .main {
    max-width: 1200px;
    margin: auto;
  }
}

.mobile {
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


.query-m {
  position: fixed;
  z-index: 66;
  width: 60px;
  height: 60px;
  background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);
  border-radius: 50%;
  right: 20px;
  bottom: 20%;
  box-shadow: 0 5px 6px 0 rgba(73, 105, 230, .22);

  svg {
    margin-left: 15px;
    margin-top: 6px;
  }

  span {
    color: #fff;
    display: block;
    text-align: center;
    margin-top: -5px;
    font-weight: 700;
    font-size: 14px;
  }
}
</style>