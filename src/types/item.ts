export interface Item {
  id: number
  name: string
  description: string
}

export type ItemPayload = Omit<Item, 'id'>

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResult {
  token: string
  user: string
}