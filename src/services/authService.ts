import { api } from '../lib/axios'
import type { IResponseEntity } from '../types/api'
import type { LoginPayload, LoginResult } from '../types/bookNote'

export async function login(
  payload: LoginPayload,
): Promise<IResponseEntity<LoginResult>> {
  const res = await api.post<IResponseEntity<LoginResult>>('/auth/login', payload)
  return res.data
}
