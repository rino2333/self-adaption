<script setup lang='ts'>
import { ref } from 'vue'

interface DemoHouse {
  width: number;
  long: number;
  id?: NumberOrString;
}

type NumberOrString = number | string;

const getHouseArea = (house: DemoHouse): number => {
  return house.width * house.long;
  // return house.width * house.long + '平方';
}

const obj: DemoHouse = {
  long: 123,
  width: 321
}

const token = localStorage.getItem('token');

const area = ref(getHouseArea(obj));

</script>

<template>
  <iframe :src="'/admin_ct/register/province/maintain/complete?token=' + token" frameborder="0"></iframe>
</template>

<style scoped lang='scss'>
iframe {
  width: 100%;
  height: 100%;
}
</style>