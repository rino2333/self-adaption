import request from "../utils/service";

interface ListReq {
  current?: number
  size?: number
  name?: string
  typeId?: string
}

export interface WareData {
  readonly id?: string
  name?: string
  describe?: string
  typeId?: string
  logo?: string
  amount?: string
}

interface ListRes {
  total: number
  records: WareData[]
}

export const listApi = (params: ListReq) => {
  return request<ListRes>({
    method: 'get',
    url: '/api/ware/list',
    params
  });
}

export const addApi = (data: WareData) => {
  return request<ListRes>({
    method: 'post',
    url: '/api/ware/add',
    data
  });
}

export const detailApi = (id: string) => {
  return request<WareData>({
    method: 'get',
    url: '/api/ware/getById',
    params: { id }
  });
}

export const editApi = (data: WareData) => {
  return request<ListRes>({
    method: 'put',
    url: '/api/ware/edit',
    data
  });
}

export const deleteApi = (ids: string) => {
  return request<ListRes>({
    method: 'delete',
    url: '/api/ware/delete',
    params: { ids }
  });
}

export interface Account {
  loginName: string
  password: string
  wareId: string
}

export const addAccountApi = (data: Account) => {
  return request<ListRes>({
    method: 'post',
    url: '/api/ware/detail/add',
    data
  });
}