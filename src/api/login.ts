import request from "../utils/service";

interface Login {
  j_username: string;
  j_password: string;
  type: string
}

interface MenuItem {
  name: string;
  path: string;
  code: string;
  url: string;
  isEnabled: number;
  children?: MenuItem[]
}

export const login = (data: Login) => {
  return request<number>({
    method: 'post',
    // url: 'api/mobile/login', // 汉口学院登录
    // url: '/zd-admin/doLogin',
    url: '/myapp/login',
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

export const wsLogin = (nickname: string) => {
  return request<MenuItem[]>({
    method: 'get',
    url: `/socket/myapp/wsLogin/${nickname}`,
  });
}

export const wsLogout = (nickname: string) => {
  return request<MenuItem[]>({
    method: 'get',
    url: `/socket/myapp/wsLogout/${nickname}`,
  });
}
