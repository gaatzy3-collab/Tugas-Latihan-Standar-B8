import type { IResponseEntity } from '../types/api'
import type { LoginPayload, LoginResult } from '../types/item'
import { ApiError } from './apiError'

const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms))

export async function login(
  payload: LoginPayload,
): Promise<IResponseEntity<LoginResult>> {
  await delay()
  if (!payload.email || !payload.password) {
    throw new ApiError(400, 'Email dan password harus diisi')
  }
  return {
    code: 200,
    status: true,
    message: 'Login berhasil',
    data: { token: 'token-palsu-12345', user: payload.email },
  }
}