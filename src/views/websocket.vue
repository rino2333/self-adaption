<script setup lang='ts'>
import { ref, onUnmounted } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { useWebSocket } from "@/hooks/useWebSocket";
import { ElMessage } from "element-plus";
import type { UploadRequestOptions, UploadProps } from 'element-plus'

const wsUrl ='ws://192.168.110.57:3000/socket/websocket';
const { 
  userName,
  msgList,
  userList,
  sendWsMsg,
  wsLogout 
} = useWebSocket(wsUrl)

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
    value: msg.value || imgUrl.value
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

const handlePictureCardPreview = (url: string) => {
  dialogImageUrl.value = url
  dialogVisible.value = true
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
  <div>在线人数：{{ userList.length }}人, 当前用户：{{ userName }}</div>

  
  <div class="flex">
    <ul>
      <li>在线用户：</li>
      <li v-for="item in userList">
        {{ item }}
      </li>
    </ul>
    <ul class="chat-content">
      <li class="text-center">匿名聊天(10)</li>
      <li v-for="item in msgList" class="flex" :class="{ 'is-self': item.userName == userName }">
        <div v-if="item.userName == userName" class="flex-align-center">
          <img v-if="item.value.includes('data:')" @click="handlePictureCardPreview(item.value)" :src="item.value" class="img-msg" alt="">
          <div v-else class="text-msg">{{ item.value }}</div>
          <div class="user-icon">
            {{ item.userName }}
          </div>
        </div>
        <div v-else class="flex-align-center">
          <div class="user-icon">
            {{ item.userName }}
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
  width: 600px;
  background-color: #f1f1f1;

  .is-self {
    justify-content: flex-end;
  }

  .user-icon {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    line-height: 50px;
    text-align: center;
    background-color: gray;
  }

  .text-msg {
    padding: 12px;
    background-color: #fff;
    border-radius: 6px;
    margin: 0 8px;
    word-break: break-all;
  }

  .img-msg {
    width: 60px;
    margin: 0 8px;
  }
}
</style>