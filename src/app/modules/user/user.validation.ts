import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'Role is required',
        // invalid_type_error: 'Role must be a string',
      }),
      password: z.string().optional(),
    }),
  }),
})

export default {
  createUserZodSchema,
}
