import request from "../utils/service";
import type { WareData, ListRes } from "./ware"

interface ListReq {
  name?: string
  describe?: string
  parentId?: string
  current?: number
  size?: number
}

export interface H5WareType {
  readonly id: string
  name?: string
  count: number
  describe?: string
  logo?: string
  sort?: number
}
// export interface WareTypeData extends WareTypeForm {
//   readonly id: string
//   status: Enable
// }


// interface ListRes {
//   total: number
//   records: WareTypeData[]
// }



export const h5TypeApi = () => {
  return request<H5WareType[]>({
    method: 'get',
    url: '/api/h5/getType',
  });
}


export const h5WareListApi = (id: string) => {
  return request<ListRes>({
    method: 'get',
    url: '/api/h5/getWareList',
    params: { id }
  });
}

export const h5WareDetailApi = (id: string) => {
  return request<WareData>({
    method: 'get',
    url: '/api/h5/getWareDetail?id=' + id,
  });
}

export const enableApi = (params: EnableReq) => {
  return request({
    method: 'put',
    url: '/api/wareType/enable',
    params
  });
}

export const createOrderApi = (params: { id: string, number: string }) => {
  return request<string>({
    method: 'get',
    url: '/api/h5/createOrder',
    params
  });
}

export const payApi = (orderNo: string) => {
  return request<string>({
    method: 'get',
    url: '/api/h5/goPay?no=' + orderNo,
  });
}