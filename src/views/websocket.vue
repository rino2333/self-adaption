<!-- <script setup lang='ts'>
import { ref, onUnmounted } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { useWebSocket } from "@/hooks/useWebSocket";
import { ElMessage } from "element-plus";
import type { UploadRequestOptions } from 'element-plus'

const wsUrl ='ws://192.168.110.177:3000/socket/websocket';
const { 
  userName,
  avatarIndex,
  ip,
  msgList,
  userList,
  wsLogin,
  sendWsMsg,
  wsLogout 
} = useWebSocket(wsUrl)

wsLogin()

// setTimeout(() => {
//   wsLogin()
// }, 5000);

const msg = ref('');
const imgUrl = ref('')

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
    value: msg.value || imgUrl.value,
    avatarIndex: avatarIndex.value,
    ip: ip.value
  }
  sendWsMsg(params)
  msg.value = '';
  imgUrl.value = ''
}

const handleUpload = (data: UploadRequestOptions) => {
  imgUrl.value = URL.createObjectURL(data.file);
  getBase64(data.file).then(resBase64 => {
    imgUrl.value = resBase64
    sendMsg()
  })
}
// //这个file参数 也就是文件信息，你使用 插件 时 你就可以打印出文件信息 看看嘛
const getBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    let reader = new FileReader();
    let fileResult = "";
    reader.readAsDataURL(file);
    //开始转
    reader.onload = function () {
      fileResult = reader.result as string;
    };
    //转 失败
    reader.onerror = function (error) {
      reject(error);
    };
    //转 结束  咱就 resolve 出去
    reader.onloadend = function () {
      resolve(fileResult);
    };
  });
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = (url: string, isAvatar?: boolean) => {
 console.log(url);
 if (isAvatar) {
  dialogImageUrl.value = getViteImage(url)
 } else {
  dialogImageUrl.value = url;
 }
  dialogVisible.value = true
}

const getViteImage = (url: string) => {
  return new URL(`../assets/images/mochadandan/${url}.jpeg`, import.meta.url).href;
}

// 浏览器刷新或者关闭 退出ws
window.onbeforeunload = function () {
  wsLogout()
}

onUnmounted(() => {
  wsLogout()
})
</script>

<template>
  <div>在线人数：{{ userList.length }}人, 当前用户：{{ userName }}, 当前IP: {{ ip }}</div>
  
  <div class="flex">
    <ul>
      <li>在线用户：</li>
      <li v-for="item in userList">
        {{ item.nickname }}
      </li>
    </ul>
    <ul class="chat-content">
      <li class="text-center">匿名聊天({{ userList.length }})</li>
      <li v-for="item in msgList" class="flex" :class="{ 'is-self': item.userName == userName }">
        <div v-if="item.userName == userName" class="flex-align-center">
          <img v-if="item.value.includes('data:')" @click="handlePictureCardPreview(item.value)" :src="item.value" class="img-msg" alt="">
          <div v-else class="text-msg">{{ item.value }}</div>
          <div class="user-icon">
            <img :src="getViteImage(item.avatarIndex)"  @click="handlePictureCardPreview(item.avatarIndex, true)" alt="">
          </div>
        </div>
        <div v-else class="flex-align-center">
          <div class="user-icon">
            <img :src="getViteImage(item.avatarIndex)"  @click="handlePictureCardPreview(item.avatarIndex, true)" alt="">
          </div>
          <img v-if="item.value.includes('data:')" @click="handlePictureCardPreview(item.value)" :src="item.value" class="img-msg" alt="">
          <div v-else class="text-msg">{{ item.value }}</div>
        </div>
      </li>
      <div class="flex-center">
        <el-input v-model="msg" placeholder="说点什么呢" @keyup.enter="sendMsg"></el-input>
        <el-upload 
          class="avatar-uploader"
          action="#" 
          :show-file-list="false" 
          :http-request="handleUpload">
              <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-button @click="sendMsg">发送</el-button>
      </div>
    </ul>
  </div>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped lang='scss'>
.chat-content {
  width: 60em;
  background-color: #f1f1f1;

  .is-self {
    justify-content: flex-end;
  }

  .user-icon {
    flex-shrink: 0;
    width: 5em;
    height: 5em;
    border-radius: 5em;
    line-height: 5em;
    text-align: center;
    background-color: gray;

    img {
      width: 100%;
      border-radius: 5em;
    }
  }

  .text-msg {
    padding: 1.2em;
    background-color: #fff;
    border-radius: .6em;
    margin: 0 .8em;
    word-break: break-all;
  }

  .img-msg {
    width: 6em;
    margin: 0 8em;
  }
}
</style> -->