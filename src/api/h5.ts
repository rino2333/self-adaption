import request from "../utils/service";
import type { WareData, ListRes } from "./ware"

interface ListReq {
  name?: string
  describe?: string
  parentId?: string
  current?: number
  size?: number
}

export type WareTypeEnable = 'NORMAL' | 'DISABLE'

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
//   status: WareTypeEnable
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
    url: '/api/h5/getChildType',
    params: { id }
  });
}

export const createOrderApi = (params: { id: string, number: string }) => {
  return request<WareData>({
    method: 'get',
    url: '/api/h5/createOrder',
    params
  });
}