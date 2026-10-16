import { z } from 'zod'

export const bookNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Judul buku harus diisi')
    .max(100, 'Maksimal 100 karakter'),
  content: z
    .string()
    .trim()
    .min(1, 'Catatan harus diisi')
    .max(500, 'Maksimal 500 karakter'),
})

export type BookNoteFormValues = z.infer<typeof bookNoteSchema>
