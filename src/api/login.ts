import request from "../utils/service";

export interface LoginReq {
  username: string;
  password: string;
  code: string
  uuid: string
}

interface QrcodeRes {
  img: string
  uuid: string
}

interface LoginRes {
  token: string
  uuid: string
  nikeName: string
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

