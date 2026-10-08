import type { IResponseEntity } from '../types/api'
import type { Item, ItemPayload } from '../types/item'
import { defaultItems } from '../data/defaultItems'
import { ApiError } from './apiError'

const STORAGE_KEY = 'appItems'
const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms))

function isItem(v: unknown): v is Item {
  if (typeof v !== 'object' || v === null) return false
  const o = v as Record<string, unknown>
  return (
    typeof o.id === 'number' &&
    typeof o.name === 'string' &&
    typeof o.description === 'string'
  )
}

function readItems(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultItems
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.every(isItem) ? parsed : defaultItems
  } catch {
    return defaultItems
  }
}

function writeItems(items: Item[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function getItems(
  page: number,
  limit: number,
): Promise<IResponseEntity<Item[]>> {
  await delay()
  const all = readItems()
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

export async function getItem(id: number): Promise<IResponseEntity<Item>> {
  await delay()
  const item = readItems().find((i) => i.id === id)
  if (!item) throw new ApiError(404, 'Item tidak ditemukan')
  return { code: 200, status: true, message: 'Berhasil', data: item }
}

export async function createItem(
  payload: ItemPayload,
): Promise<IResponseEntity<Item>> {
  await delay()
  const all = readItems()
  const id = all.length > 0 ? Math.max(...all.map((i) => i.id)) + 1 : 1
  const item: Item = { id, ...payload }
  writeItems([...all, item])
  return { code: 201, status: true, message: 'Item berhasil ditambahkan', data: item }
}

export async function updateItem(
  id: number,
  payload: ItemPayload,
): Promise<IResponseEntity<Item>> {
  await delay()
  const all = readItems()
  if (!all.some((i) => i.id === id)) throw new ApiError(404, 'Item tidak ditemukan')
  const item: Item = { id, ...payload }
  writeItems(all.map((i) => (i.id === id ? item : i)))
  return { code: 200, status: true, message: 'Item berhasil diupdate', data: item }
}

export async function deleteItem(id: number): Promise<IResponseEntity<null>> {
  await delay()
  writeItems(readItems().filter((i) => i.id !== id))
  return { code: 200, status: true, message: 'Item berhasil dihapus' }
}