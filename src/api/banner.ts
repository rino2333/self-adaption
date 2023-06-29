import request from "../utils/service";

export const getBannerList = (params: any) => {
  return request({
    url: '/htgl/inf/banner/list',
    method: 'get',
    params
  });
}