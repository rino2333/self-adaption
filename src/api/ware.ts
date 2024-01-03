import request from "../utils/service";
import { EnableRes, WareTypeEnable } from "./ware-type";

interface ListReq {
  current?: number
  size?: number
  name?: string
  typeId?: string
}

export interface WareForm {
  name?: string
  describe?: string
  typeId?: string
  logo?: string
  amount?: string
  count?: string
}

export interface WareData extends WareForm {
  readonly id: string
  status: WareTypeEnable
}

export interface ListRes {
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

export const addApi = (data: WareForm) => {
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

interface editRes extends WareForm {
  readonly id: string
}
export const editApi = (data: editRes) => {
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

export const enableApi = (params: EnableRes) => {
  return request<ListRes>({
    method: 'put',
    url: '/api/ware/enable',
    params
  });
}

export interface Account {
  loginName: string
  password: string
  wareId: string
}

interface AccountList {
  records: Account[]
}
export const addAccountApi = (data: Account) => {
  return request<ListRes>({
    method: 'post',
    url: '/api/ware/detail/add',
    data
  });
}

export const AccountListApi = (params: { wareId: string }) => {
  return request<AccountList>({
    method: 'get',
    url: '/api/ware/detail/list',
    params
  });
}