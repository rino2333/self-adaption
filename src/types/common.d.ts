type Enable = 'NORMAL' | 'DISABLE'

interface EnableReq {
  id: string
  status: Enable
}