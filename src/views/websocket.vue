<script setup lang='ts'>
import { ref, onUnmounted } from 'vue';
import { ElMessage } from "element-plus";
import { wsLogin, wsLogout } from "@/api/login";

interface WsMsg {
  userName: string
  value: string
}

const userName = ref('');
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

const ws = new WebSocket('ws://192.168.110.114:3000/socket/websocket');
// const ws = new WebSocket('ws://localhost:3000/socket/websocket');
ws.onmessage = (e) => {
  console.log(e.data);
  const { type, data, text } = JSON.parse(e.data);
  if (type == 'userList') {
    userList.value = data;
    console.log(userList.value);
  }
  if (type == 'msg') {
    console.log(data);
    console.log(text);
    userList.value = data;

    getNickname();
    if (userName.value) {
      wsLogin(userName.value).then(res => {
        console.log(res);
      })
    }
  }
  if (type == 'msgList') {
    msgList.value = data;
    console.log(msgList.value);
  }
}

const userList = ref<string[]>([]);

const getNickname = () => {
  // 昵称池
  const nickname_pool = ['张一', '张二', '张三', '张四', '张五'];

  const new_arr = nickname_pool.filter(item => !userList.value.includes(item));
  if (new_arr.length == 0) {
    ElMessage.warning('聊天室人满了');
    return '';
  }
  // 过滤后昵称池的随机下标
  const random_num = Math.floor(Math.random() * new_arr.length);
  // 生成随机昵称 但不能出现重复的
  userName.value = new_arr[random_num];
}

onUnmounted(() => {
  wsLogout(userName.value).then(res => {
    console.log(res);
  })
})
</script>

<template>
  <div>当前在线人数：{{ userList.length }}人</div>

  <el-input v-model="userName" disabled placeholder="输入昵称"></el-input>
  <el-input v-model="msg" placeholder="说点什么呢" @keyup.enter="sendMsg"></el-input>
  <el-button @click="sendMsg">发送</el-button>
  <div class="flex">
    <ul>
      <li>在线用户：</li>
      <li v-for="item in userList">
        {{ item }}
        <!-- {{ item.userName }}:
        {{ item.value }} -->
      </li>
    </ul>
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