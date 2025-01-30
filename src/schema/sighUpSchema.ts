import { emitWarning } from 'process'
import { object, z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2 , "Username must be atleat 2 char")
    .max(20 , "Username less than 20 char")
    .regex( /^[a-zA-Z0-9]+$/ , "must not contain any special char")


export const signUpSchema = z.object({
    username : usernameValidation,
    email: z.string().email({message:"invalid email address"}),
    password: z.string().min(6 , {message:"min length should be 6"}).max(16 , {message:"max length 16"})
})

