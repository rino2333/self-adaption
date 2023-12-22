import request from "../utils/service";

export const imgUpload = (data: FormData) => {
  return request({
    url: '/api/common/imgUpload',
    method: 'post',
    data
  });
}