export interface ImetaPagination {
  totalPages: number
  totalData: number
  totalDataPerPage: number
  page: number
  limit: number
}

export interface IResponseEntity<T> {
  code: number // HTTP status
  status: boolean // true = sukses
  message: string // dari ValidationPipe bisa berupa array of string
  data?: T
  meta?: ImetaPagination
}