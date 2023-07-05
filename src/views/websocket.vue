<script setup lang='ts'>
import { ref } from 'vue';
import { ElMessage } from "element-plus";

interface WsMsg {
  userName: string
  value: string
}

const userName = ref('易洋');
const msg = ref('');
const msgList = ref<WsMsg[]>([]);

const sendMsg = () => {
  if (!userName.value) {
    ElMessage.warning('请输入昵称');
    return;
  }
  if (!msg.value) {
    ElMessage.warning('消息不能为空哦');
    return;
  }
  const params = {
    userName: userName.value,
    value: msg.value
  }
  ws.send(JSON.stringify(params));
  msg.value = '';
}

const ws = new WebSocket('ws://192.168.110.147:3000/socket/websocket');
ws.onmessage = (e) => {
  console.log(e.data);
  if (e.data == '你链接成功了') {
    return;
  }
  msgList.value = JSON.parse(e.data);
  console.log(msgList.value);
}
</script>

<template>
  <el-input v-model="userName" placeholder="输入昵称"></el-input>
  <el-input v-model="msg" placeholder="说点什么呢" @keyup.enter="sendMsg"></el-input>
  <el-button @click="sendMsg">发送</el-button>
  <div>
    <ul>
      <li v-for="item in msgList">
        {{ item.userName }}:
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>

</style>