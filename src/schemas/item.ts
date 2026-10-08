import { z } from 'zod'

export const itemSchema = z.object({
  name: z.string().trim().min(1, 'Nama harus diisi').max(100, 'Maksimal 100 karakter'),
  description: z
    .string()
    .trim()
    .min(1, 'Deskripsi harus diisi')
    .max(500, 'Maksimal 500 karakter'),
})

export type ItemFormValues = z.infer<typeof itemSchema>