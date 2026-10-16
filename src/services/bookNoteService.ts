import { api } from '../lib/axios'
import type { IResponseEntity } from '../types/api'
import type { BookNote, BookNotePayload } from '../types/bookNote'

export async function getBookNotes(
  page: number,
  limit: number,
): Promise<IResponseEntity<BookNote[]>> {
  const res = await api.get<IResponseEntity<BookNote[]>>('/book-notes', {
    params: { page, limit },
  })
  return res.data
}

export async function getBookNote(id: number): Promise<IResponseEntity<BookNote>> {
  const res = await api.get<IResponseEntity<BookNote>>(`/book-notes/${id}`)
  return res.data
}

export async function createBookNote(
  payload: BookNotePayload,
): Promise<IResponseEntity<BookNote>> {
  const res = await api.post<IResponseEntity<BookNote>>('/book-notes', payload)
  return res.data
}

export async function updateBookNote(
  id: number,
  payload: BookNotePayload,
): Promise<IResponseEntity<BookNote>> {
  const res = await api.put<IResponseEntity<BookNote>>(`/book-notes/${id}`, payload)
  return res.data
}

export async function deleteBookNote(id: number): Promise<IResponseEntity<null>> {
  const res = await api.delete<IResponseEntity<null>>(`/book-notes/${id}`)
  return res.data
}
