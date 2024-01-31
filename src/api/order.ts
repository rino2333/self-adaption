import request from "../utils/service";

export enum OrderEnum {
  UNPAID = '未支付',
  PAID = '已支付',
  CANCELED = '订单超时'
}

interface ListReq {
  current: number
  size: number
  name?: string
}

export interface OrderData {
  status: keyof typeof OrderEnum
  no: string
}

interface ListRes {
  total: number
  records: OrderData[]
}

export const listApi = (params: ListReq) => {
  return request<ListRes>({
    method: 'get',
    url: '/api/order/list',
    params
  });
}

export const detailApi = (no: string) => {
  return request<{ content: string }>({
    method: 'get',
    url: '/api/order/detail?no=' + no,
  });
}

