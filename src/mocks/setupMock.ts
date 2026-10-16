import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import type { IResponseEntity, ImetaPagination } from '../types/api'
import type { BookNote } from '../types/bookNote'
import { bookNoteSchema } from '../schemas/bookNote'
import { loginSchema } from '../schemas/auth'
import { readBookNotes, writeBookNotes } from './bookNoteStore'

type MockReply = [number, IResponseEntity<unknown>]

function reply<T>(
  code: number,
  message: string,
  data?: T,
  meta?: ImetaPagination,
): MockReply {
  return [code, { code, status: code < 400, message, data, meta }]
}

function parseBody(config: AxiosRequestConfig): unknown {
  const raw: unknown = config.data
  return typeof raw === 'string' ? JSON.parse(raw) : raw
}

function getId(config: AxiosRequestConfig): number {
  return Number(config.url?.split('/').pop())
}

const NOTE_BY_ID = /^\/book-notes\/\d+$/

export function setupMock(api: AxiosInstance): void {
  const mock = new MockAdapter(api, { delayResponse: 300 })

  mock.onPost('/auth/login').reply((config) => {
    const parsed = loginSchema.safeParse(parseBody(config))
    if (!parsed.success) return reply(400, 'Email dan password tidak valid')
    return reply(200, 'Login berhasil', {
      token: 'token-palsu-12345',
      user: parsed.data.email,
    })
  })

  mock.onGet('/book-notes').reply((config) => {
    const page = Math.max(1, Number(config.params?.page ?? 1))
    const limit = Math.max(1, Number(config.params?.limit ?? 10))
    const all = readBookNotes()
    const start = (page - 1) * limit
    const data = all.slice(start, start + limit)
    return reply(200, 'Berhasil mengambil data', data, {
      totalPages: Math.max(1, Math.ceil(all.length / limit)),
      totalData: all.length,
      totalDataPerPage: data.length,
      page,
      limit,
    })
  })

  mock.onGet(NOTE_BY_ID).reply((config) => {
    const note = readBookNotes().find((n) => n.id === getId(config))
    return note ? reply(200, 'Berhasil', note) : reply(404, 'Catatan tidak ditemukan')
  })

  mock.onPost('/book-notes').reply((config) => {
    const parsed = bookNoteSchema.safeParse(parseBody(config))
    if (!parsed.success) return reply(400, 'Data catatan tidak valid')
    const all = readBookNotes()
    const id = all.length > 0 ? Math.max(...all.map((n) => n.id)) + 1 : 1
    const note: BookNote = { id, ...parsed.data }
    writeBookNotes([...all, note])
    return reply(201, 'Catatan berhasil ditambahkan', note)
  })

  mock.onPut(NOTE_BY_ID).reply((config) => {
    const id = getId(config)
    const parsed = bookNoteSchema.safeParse(parseBody(config))
    if (!parsed.success) return reply(400, 'Data catatan tidak valid')
    const all = readBookNotes()
    if (!all.some((n) => n.id === id)) return reply(404, 'Catatan tidak ditemukan')
    const note: BookNote = { id, ...parsed.data }
    writeBookNotes(all.map((n) => (n.id === id ? note : n)))
    return reply(200, 'Catatan berhasil diupdate', note)
  })

  mock.onDelete(NOTE_BY_ID).reply((config) => {
    const id = getId(config)
    writeBookNotes(readBookNotes().filter((n) => n.id !== id))
    return reply(200, 'Catatan berhasil dihapus')
  })
}
