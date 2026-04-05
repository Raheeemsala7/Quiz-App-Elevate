import { z } from "zod"

export const registrationSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .regex(/^[\u0621-\u064A\u0660-\u0669a-zA-Z\s]+$/, 'Name can only contain Arabic or English letters and spaces'),
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
    // .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    // .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    // .regex(/(?=.*\d)/, 'Password must contain at least one number')
    // .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
});

// TypeScript type from Zod schema
export type RegistrationFormType = z.infer<typeof registrationSchema>;



export const signInSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
    // .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    // .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    // .regex(/(?=.*\d)/, 'Password must contain at least one number')
    // .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
});

// TypeScript type from Zod schema
export type SignInFormType = z.infer<typeof signInSchema>;