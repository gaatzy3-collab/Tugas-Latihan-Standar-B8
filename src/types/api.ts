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
  message: string // jika dari ValidationPipe berupa array, digabung menjadi satu string
  data?: T
  meta?: ImetaPagination
}
