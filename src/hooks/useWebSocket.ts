import { ref } from "vue";
import { wsLoginApi, wsLogoutApi } from "@/api/login";
import { ElMessage } from "element-plus";

interface WsMsg {
  userName: string
  value: string
}

export function useWebSocket(wsUrl: string) {
  const ws = new WebSocket(wsUrl);

  const userName = ref('');
  const msgList = ref<WsMsg[]>([]);
  const userList = ref<string[]>([]);

  ws.onmessage = (e) => {
    console.log(e.data);
    const { type, data, text } = JSON.parse(e.data);
    switch (type) {
      case 'userList':
        userList.value = data;
        console.log(userList.value);
        break;
      case 'msg':
        console.log(data);
        console.log(text);
        userList.value = data;
        getNickname()
        if (userName.value) {
          wsLoginApi(userName.value).then(res => {
            console.log(res);
          })
        }
        break;
      case 'msgList':
        msgList.value = data;
        console.log(msgList.value);
        break;
      default:
        console.error('异常');
        break;
    }
  }

  const sendWsMsg = (params: WsMsg) => {
    ws.send(JSON.stringify(params));
  }

  const getNickname = () => {
    // 昵称池
    const nickname_pool = ['张一', '张二', '张三', '张四', '张五', '张六', '张七', '张八', '张九', '张麻子'];

    const new_arr = nickname_pool.filter(item => !userList.value.includes(item));
    if (new_arr.length == 0) {
      ElMessage.warning('聊天室人满了');
      return;
    }
    // 过滤后昵称池的随机下标
    const random_num = Math.floor(Math.random() * new_arr.length);
    // 生成随机昵称 但不能出现重复的
    userName.value = new_arr[random_num];
  }
  
  const wsLogout = () => {
    wsLogoutApi(userName.value).then(res => {
      console.log(res);
    })
  }

  return {
    userName,
    msgList,
    userList,
    sendWsMsg,
    wsLogout
  }
}