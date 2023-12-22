import request from "../utils/service";

interface ListReq {
  name?: string
  describe?: string
  parentId?: string
  current?: number
  size?: number
}

export interface ResItem {
  name?: string
  describe?: string
}

interface ListRes {
  total: number
  records: ResItem[]
}

export const listApi = (params: ListReq) => {
  return request<ListRes>({
    method: 'get',
    url: '/api/wareType/list',
    params
  });
}

export interface WareTypeData {
  id?: string
  name?: string
  describe?: string
}

export const addApi = (data: WareTypeData) => {
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

export const editApi = (data: WareTypeData) => {
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

export const treeApi = () => {
  return request<ListRes>({
    method: 'get',
    url: '/api/wareType/tree',
  });
}

