import request from "../utils/service";

interface ListReq {
  current?: string
  size?: string
}

export interface WareData {
  id?: string
  name?: string
  describe?: string
  typeId?: string
  logo?: string
//   number} params.amount 商品金额
//  * @param {object} params.createTime 创建时间
//  * @param {number} params.creatorId 创建人
//  * @param {number} params.id 
//  * @param {string} params.logo 商品logo
//  * @param {number} params.modifiorId 修改人
//  * @param {object} params.modifyTime 修改时间
//  * @param {string} params.shipWay 出货方式
//  * @param {string} params.typeName 类型名称
}

export const listApi = (params: ListReq) => {
  return request<ListReq>({
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

export const treeApi = () => {
  return request<ListRes>({
    method: 'get',
    url: '/api/ware/tree',
  });
}