import { z } from 'zod'

export const messageSchema = z.object({
  content: z
    .string()
    .min(10 , {message:'content must be atleat of 10 char'})
    .max(399 , {message: 'content must be less tha 400 char'})
})