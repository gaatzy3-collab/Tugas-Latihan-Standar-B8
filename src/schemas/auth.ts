import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email harus diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
})

export type LoginFormValues = z.infer<typeof loginSchema>