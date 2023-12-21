import request from "../utils/service";

export interface LoginReq {
  username: string;
  password: string;
  code: string
  uuid: string
}

interface MenuItem {
  name: string;
  path: string;
  code: string;
  url: string;
  isEnabled: number;
  children?: MenuItem[]
}

export interface WxLoginResData {
  nickname: string;
  avatarIndex: string;
  ip: string
}

export interface WsUserData {
  ip: string;
}

interface QrcodeRes {
  img: string
  uuid: string
}

interface LoginRes {
  token: string
  uuid: string
}

export const qrcodeApi = () => {
  return request<QrcodeRes>({
    method: 'get',
    url: '/api/common/imgYzm',
  });
}

export const loginApi = (data: FormData) => {
  return request<LoginRes>({
    method: 'post',
    url: '/api/login',
    data
  });
}

export const getMenu = () => {
  return request<MenuItem[]>({
    method: 'post',
    // url: 'api/mobile/login', // 汉口学院登录
    // url: '/zd-admin/getMenu',
    url: '/myapp/getMenu',
  });
}

export const wsLoginApi = (data: WsUserData) => {
  return request<WxLoginResData>({
    method: 'post',
    url: `/socket/myapp/wsLogin`,
    data
  });
}

export const wsLogoutApi = (data: WsUserData) => {
  return request<MenuItem[]>({
    method: 'post',
    url: `/socket/myapp/wsLogout`,
    data
  });
}
