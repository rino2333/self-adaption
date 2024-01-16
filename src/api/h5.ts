import request from "../utils/service";
import type { WareData, ListRes } from "./ware"
import { OrderEnum } from "./order"

export interface H5WareType {
  readonly id: string
  name?: string
  count: number
  describe?: string
  logo?: string
  sort?: number
}

interface PayDetail {
  status: keyof typeof OrderEnum
  detail: {
    content: string
  }
}

export interface OrderDetail {
  content: string
  amount: number
  orderNo: string
  name: string
}

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

export const createOrderApi = (params: { id: string, number: string, mobile: string }) => {
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

export const isPayApi = (orderNo: string) => {
  return request<PayDetail>({
    method: 'get',
    url: '/api/h5/isPayed?no=' + orderNo,
  });
}

export const orderDetailApi = (mobile: string) => {
  return request<OrderDetail[]>({
    method: 'get',
    url: '/api/h5/getOrderDetail?mobile=' + mobile,
  });
}