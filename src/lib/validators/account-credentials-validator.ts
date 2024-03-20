import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  email: z.string().email({ message: 'El email no es válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
