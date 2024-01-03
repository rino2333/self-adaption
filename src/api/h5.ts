import request from "../utils/service";

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