import request from "../utils/service";

type ConfigCategory = 'BASIC' | 'FTMP' | 'ALIPAY' | 'WXPAY'

export enum CategoryEnum {
  BASIC = 'BASIC',
  FTMP = 'FTMP',
  ALIPAY = 'ALIPAY',
  WXPAY = 'WXPAY'
}

export interface ConfigForm {
  category: ConfigCategory
  details: string
}

interface ConfigData extends ConfigForm {
  id: string
}

export const listApi = (category?: ConfigCategory) => {
  return request({
    method: 'post',
    url: '/api/sysConfig/list',
    data: {
      category
    }
  });
}

export const addApi = (data: ConfigForm) => {
  return request({
    method: 'post',
    url: '/api/sysConfig/add',
    data
  });
}

export const editApi = (data: ConfigData) => {
  return request({
    method: 'post',
    url: '/api/sysConfig/edit',
    data
  });
}

export const deleteApi = (ids: string) => {
  return request({
    method: 'get',
    url: '/api/sysConfig/delete?ids=' + ids,
  });
}

export const detailApi = (id: string) => {
  return request<ConfigData>({
    method: 'get',
    url: '/api/sysConfig/detail?id=' + id,
  });
}

