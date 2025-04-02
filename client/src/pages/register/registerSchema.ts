import { z } from 'zod';

const passwordValidation = new RegExp(
    /(?=^.{8,12}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
)

export const registerSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }).nonempty({
        message: "Email is required"
    }),
    password: z.string().regex(passwordValidation, {
        message: "Password must be 8-12 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }).nonempty({
        message: "Password is required"
    })
})

export type RegisterSchema = z.infer<typeof registerSchema>;