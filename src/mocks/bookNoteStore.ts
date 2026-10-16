import type { BookNote } from '../types/bookNote'
import { defaultBookNotes } from '../data/defaultBookNotes'

const STORAGE_KEY = 'bookNotes'

function isBookNote(v: unknown): v is BookNote {
  if (typeof v !== 'object' || v === null) return false
  const o = v as Record<string, unknown>
  return (
    typeof o.id === 'number' &&
    typeof o.title === 'string' &&
    typeof o.content === 'string'
  )
}

export function readBookNotes(): BookNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultBookNotes
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.every(isBookNote) ? parsed : defaultBookNotes
  } catch {
    return defaultBookNotes
  }
}

export function writeBookNotes(notes: BookNote[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}
