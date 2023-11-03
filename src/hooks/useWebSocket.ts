import { ref } from "vue";
import { wsLoginApi, wsLogoutApi } from "@/api/login";
import { ElMessage } from "element-plus";
import {  type WxLoginResData } from "@/api/login";
import { getIPs } from "@/utils/ip";

interface WsMsg {
  userName: string;
  value: string;
  avatarIndex: string;
  ip: string
}

export function useWebSocket(wsUrl: string) {
  let ws: WebSocket;
  let ip = ref('');

  const userName = ref('');
  const avatarIndex = ref('');
  const msgList = ref<WsMsg[]>([]);
  const userList = ref<WxLoginResData[]>([]);

  const wsLogin = () => {
    getIPs().then(res => {
      console.log(res);
      ip.value = res 
      ws = new WebSocket(wsUrl);
      ws.onmessage = (e) => {
        console.log(e.data);
        const { type, data, text } = JSON.parse(e.data);
        switch (type) {
          case 'userList':
            userList.value = data;
            console.log(userList.value);
            break;
          case 'inlineUserList':
            userList.value = data;
            console.log(data);
            console.log(ip.value);
            console.log(userName.value);
            
            if (userName.value && !userList.value.map(item => item.nickname).includes(userName.value)) {
              // alert(123)
              wsLogin()
            }
            console.log(userList.value);
            break;
          case 'msg':
            console.log(data);
            console.log(text);
            userList.value = data;
            if (ip.value) {
              const params = { ip: ip.value };
              wsLoginApi(params).then(res => {
                console.log(res);
                userName.value = res.data.nickname
                avatarIndex.value = res.data.avatarIndex
              }).catch(err => {
                console.log(err);
                if (err.code == 438) {
                  userName.value = err.data.nickname
                  avatarIndex.value = err.data.avatarIndex
                }
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
    }).catch(err => {
      console.log(err);
      alert(`${navigator.userAgent.indexOf('Chrome') == -1 ? '请使用chrome浏览器打开此网页，并且' : ''}在chrome地址栏输入：chrome://flags/ 进入后，搜索#enable-webrtc-hide-local-ips-with-mdns该配置，并将该属性改为disabled后，点进右下角Relaunch按钮`)
      wsLogin()
    })
  }

  const sendWsMsg = (params: WsMsg) => {
    ws.send(JSON.stringify(params));
  }
  
  const wsLogout = () => {
    const params = {
      ip: ip.value
    }
    wsLogoutApi(params).then(res => {
      console.log(res);
    })
  }

  return {
    ip,
    userName,
    avatarIndex,
    msgList,
    userList,
    wsLogin,
    sendWsMsg,
    wsLogout
  }
}