import type { IResponseEntity } from '../types/api'
import type { BookNote, BookNotePayload } from '../types/bookNote'
import { defaultBookNotes } from '../data/defaultBookNotes'
import { ApiError } from './apiError'

const STORAGE_KEY = 'bookNotes'
const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms))

function isBookNote(v: unknown): v is BookNote {
  if (typeof v !== 'object' || v === null) return false
  const o = v as Record<string, unknown>
  return (
    typeof o.id === 'number' &&
    typeof o.title === 'string' &&
    typeof o.content === 'string'
  )
}

function readBookNotes(): BookNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultBookNotes
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.every(isBookNote) ? parsed : defaultBookNotes
  } catch {
    return defaultBookNotes
  }
}

function writeBookNotes(notes: BookNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export async function getBookNotes(
  page: number,
  limit: number,
): Promise<IResponseEntity<BookNote[]>> {
  await delay()
  const all = readBookNotes()
  const start = (page - 1) * limit
  const data = all.slice(start, start + limit)
  return {
    code: 200,
    status: true,
    message: 'Berhasil mengambil data',
    data,
    meta: {
      totalPages: Math.max(1, Math.ceil(all.length / limit)),
      totalData: all.length,
      totalDataPerPage: data.length,
      page,
      limit,
    },
  }
}

export async function getBookNote(id: number): Promise<IResponseEntity<BookNote>> {
  await delay()
  const note = readBookNotes().find((n) => n.id === id)
  if (!note) throw new ApiError(404, 'Catatan tidak ditemukan')
  return { code: 200, status: true, message: 'Berhasil', data: note }
}

export async function createBookNote(
  payload: BookNotePayload,
): Promise<IResponseEntity<BookNote>> {
  await delay()
  const all = readBookNotes()
  const id = all.length > 0 ? Math.max(...all.map((n) => n.id)) + 1 : 1
  const note: BookNote = { id, ...payload }
  writeBookNotes([...all, note])
  return { code: 201, status: true, message: 'Catatan berhasil ditambahkan', data: note }
}

export async function updateBookNote(
  id: number,
  payload: BookNotePayload,
): Promise<IResponseEntity<BookNote>> {
  await delay()
  const all = readBookNotes()
  if (!all.some((n) => n.id === id)) throw new ApiError(404, 'Catatan tidak ditemukan')
  const note: BookNote = { id, ...payload }
  writeBookNotes(all.map((n) => (n.id === id ? note : n)))
  return { code: 200, status: true, message: 'Catatan berhasil diupdate', data: note }
}

export async function deleteBookNote(id: number): Promise<IResponseEntity<null>> {
  await delay()
  writeBookNotes(readBookNotes().filter((n) => n.id !== id))
  return { code: 200, status: true, message: 'Catatan berhasil dihapus' }
}