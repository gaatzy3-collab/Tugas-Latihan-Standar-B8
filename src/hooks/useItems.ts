import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as itemService from '../services/itemService'
import type { ItemPayload } from '../types/item'

export function useItems(page: number, limit: number) {
  return useQuery({
    queryKey: ['items', page, limit],
    queryFn: () => itemService.getItems(page, limit),
    placeholderData: keepPreviousData,
  })
}

export function useItem(id: number | undefined) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => itemService.getItem(id as number),
    enabled: id !== undefined,
  })
}

export function useCreateItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: ItemPayload) => itemService.createItem(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }),
  })
}

export function useUpdateItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ItemPayload }) =>
      itemService.updateItem(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['items'] })
      qc.invalidateQueries({ queryKey: ['item'] })
    },
  })
}

export function useDeleteItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => itemService.deleteItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }),
  })
}