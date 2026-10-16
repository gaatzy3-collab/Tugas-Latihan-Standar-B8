import axios from 'axios'
import type { IResponseEntity } from '../types/api'
import { ApiError } from '../services/apiError'

const GENERIC_MESSAGE = 'Terjadi kesalahan pada server. Silakan coba lagi.'

function isResponseEntity(value: unknown): value is IResponseEntity<unknown> {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>
  return (
    typeof obj.code === 'number' && typeof obj.status === 'boolean' && 'message' in obj
  )
}

// message dari ValidationPipe bisa berupa array of string
function toText(message: unknown): string {
  return Array.isArray(message) ? message.map(String).join(', ') : String(message)
}

export function getErrorMessage(error: unknown): string {
  // error dari service mock
  if (error instanceof ApiError) {
    return error.code >= 500 ? GENERIC_MESSAGE : error.message
  }

  // error dari Axios (backend asli): body selalu IResponseEntity
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Tidak dapat terhubung ke server.'
    const body: unknown = error.response.data
    if (isResponseEntity(body)) {
      return body.code >= 500 ? GENERIC_MESSAGE : toText(body.message)
    }
    return GENERIC_MESSAGE
  }

  return GENERIC_MESSAGE
}
