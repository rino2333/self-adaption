<script setup lang='ts'>
import { ref, onUnmounted } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { useWebSocket } from "@/hooks/useWebSocket";
import { ElMessage } from "element-plus";


const wsUrl ='ws://192.168.110.219:3000/socket/websocket';
const { 
  userName,
  msgList,
  userList,
  sendWsMsg,
  wsLogout 
} = useWebSocket(wsUrl)

interface WsMsg {
  userName: string
  value: string
}

// const userName = ref('');
const msg = ref('');
const imgUrl = ref('')
// const msgList = ref<WsMsg[]>([]);
// const userList = ref<string[]>([]);

const sendMsg = () => {
  if (!userName.value) {
    ElMessage.warning('请输入昵称');
    return;
  }
  if (!msg.value && !imgUrl.value) {
    ElMessage.warning('消息不能为空哦');
    return;
  }
  const params = {
    userName: userName.value,
    value: msg.value || imgUrl.value
  }
  sendWsMsg(params)
  msg.value = '';
  imgUrl.value = ''
}

// const ws = new WebSocket('ws://192.168.110.219:3000/socket/websocket');
// // const ws = new WebSocket('ws://localhost:3000/socket/websocket');
// ws.onmessage = (e) => {
//   console.log(e.data);
//   const { type, data, text } = JSON.parse(e.data);
//   if (type == 'userList') {
//     userList.value = data;
//     console.log(userList.value);
//   }
//   if (type == 'msg') {
//     console.log(data);
//     console.log(text);
//     userList.value = data;

//     getNickname();
//     if (userName.value) {
//       wsLoginApi(userName.value).then(res => {
//         console.log(res);
//       })
//     }
//   }
//   if (type == 'msgList') {
//     msgList.value = data;
//     console.log(msgList.value);
//   }
// }


// const getNickname = () => {
//   // 昵称池
//   const nickname_pool = ['张一', '张二', '张三', '张四', '张五', '张六', '张七', '张八', '张九', '张麻子'];

//   const new_arr = nickname_pool.filter(item => !userList.value.includes(item));
//   if (new_arr.length == 0) {
//     ElMessage.warning('聊天室人满了');
//     return '';
//   }
//   // 过滤后昵称池的随机下标
//   const random_num = Math.floor(Math.random() * new_arr.length);
//   // 生成随机昵称 但不能出现重复的
//   userName.value = new_arr[random_num];
// }

// const abc = (data) => {
//     imgUrl.value = URL.createObjectURL(data.file);
//     getBase64(data.file).then(resBase64 => {
//       console.log(resBase64);
//       imgUrl.value = resBase64
      
//         // this.$apiPost('https://www.zzgoodqc.cn/index.php/index/upload/uploadimg', { imgurl: resBase64 }).then(res => {
//         //     console.log(res);
//         // })
//     })
    
// }
// //这个file参数 也就是文件信息，你使用 插件 时 你就可以打印出文件信息 看看嘛
// const getBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//       let reader = new FileReader();
//       let fileResult = "";
//       reader.readAsDataURL(file);
//       //开始转
//       reader.onload = function () {
//           fileResult = reader.result;
//       };
//       //转 失败
//       reader.onerror = function (error) {
//           reject(error);
//       };
//       //转 结束  咱就 resolve 出去
//       reader.onloadend = function () {
//           resolve(fileResult);
//       };
//   });
// }

// 浏览器刷新或者关闭 退出ws
window.onbeforeunload = function () {
  wsLogout()
}

onUnmounted(() => {
  wsLogout()
})
</script>

<template>
  <div>当前在线人数：{{ userList.length }}人</div>

  <el-input v-model="userName" disabled placeholder="输入昵称"></el-input>
  <el-input v-model="msg" placeholder="说点什么呢" @keyup.enter="sendMsg"></el-input>
  <el-upload 
    class="avatar-uploader"
    action="#" 
    :show-file-list="false" 
    :http-request="abc">
        <img v-if="imgUrl" :src="imgUrl" class="avatar">
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
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
      <li v-for="item in msgList" class="flex">
        {{ item.userName }}:
        <template v-if="item.value.includes('data:')">
          <img :src="item.value" style="width: 60px;" alt="">
        </template>
        <div v-else>{{ item.value }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>

</style>