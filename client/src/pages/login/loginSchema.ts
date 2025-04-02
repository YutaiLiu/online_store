import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }).nonempty({
        message: "Email is required"
    }),
    password: z.string().nonempty({
        message: "Password is required"
    })
})

export type LoginSchema = z.infer<typeof loginSchema>;