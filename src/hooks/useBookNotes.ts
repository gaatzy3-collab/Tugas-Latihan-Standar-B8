import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as bookNoteService from '../services/bookNoteService'
import type { BookNotePayload } from '../types/bookNote'

export function useBookNotes(page: number, limit: number) {
  return useQuery({
    queryKey: ['book-notes', page, limit],
    queryFn: () => bookNoteService.getBookNotes(page, limit),
    placeholderData: keepPreviousData,
  })
}

export function useBookNote(id: number | undefined) {
  return useQuery({
    queryKey: ['book-note', id],
    queryFn: () => bookNoteService.getBookNote(id as number),
    enabled: id !== undefined,
  })
}

export function useCreateBookNote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: BookNotePayload) => bookNoteService.createBookNote(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['book-notes'] }),
  })
}

export function useUpdateBookNote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: BookNotePayload }) =>
      bookNoteService.updateBookNote(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['book-notes'] })
      qc.invalidateQueries({ queryKey: ['book-note'] })
    },
  })
}

export function useDeleteBookNote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => bookNoteService.deleteBookNote(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['book-notes'] }),
  })
}
