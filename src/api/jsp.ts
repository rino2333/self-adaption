import request from "../utils/service";


export const getJsp = () => {
  return request({
    method: 'get',
    url: '/jsp/register/province/maintain/complete',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
}

export const jspLogin = (data: any) => {
  return request({
    method: 'post',
    url: '/jsp/admin-web-ct/j_spring_security_check',
    data
  });
}