import request from "../utils/service";

interface ListReq {
  name?: string
  describe?: string
  parentId?: string
  current?: number
  size?: number
}

export type WareTypeEnable = 'NORMAL' | 'DISABLE'

export interface WareTypeForm {
  name?: string
  describe?: string
  logo?: string
  sort?: number
}
export interface WareTypeData extends WareTypeForm {
  readonly id: string
  status: WareTypeEnable
}

interface ListRes {
  total: number
  records: WareTypeData[]
}

export const listApi = (params: ListReq) => {
  return request<ListRes>({
    method: 'get',
    url: '/api/wareType/list',
    params
  });
}

export const addApi = (data: WareTypeForm) => {
  return request<ListRes>({
    method: 'post',
    url: '/api/wareType/add',
    data
  });
}

export const detailApi = (id: string) => {
  return request<WareTypeData>({
    method: 'get',
    url: '/api/wareType/getById',
    params: { id }
  });
}

interface editRes extends WareTypeForm {
  readonly id: string
}
export const editApi = (data: editRes) => {
  return request<ListRes>({
    method: 'put',
    url: '/api/wareType/edit',
    data
  });
}

export const deleteApi = (ids: string) => {
  return request<ListRes>({
    method: 'delete',
    url: '/api/wareType/delete',
    params: { ids }
  });
}

interface EnableRes {
  id: string, 
  status: WareTypeEnable
}
export const enableApi = (params: EnableRes) => {
  return request<ListRes>({
    method: 'put',
    url: '/api/wareType/enable',
    params
  });
}

export interface WareTypeTree {
  name:string 
  id: string
}

export const treeApi = () => {
  return request<WareTypeTree[]>({
    method: 'get',
    url: '/api/wareType/tree',
  });
}

