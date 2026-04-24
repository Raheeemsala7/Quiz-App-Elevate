import z from "zod";


export const profileSchema = z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .regex(/^[\u0621-\u064A\u0660-\u0669a-zA-Z\s]+$/, 'First name can only contain Arabic or English letters and spaces'),
    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .regex(/^[\u0621-\u064A\u0660-\u0669a-zA-Z\s]+$/, 'Last name can only contain Arabic or English letters and spaces'),
    username: z
        .string()
        .min(2, 'Username must be at least 2 characters')
        .max(50, 'Username must be less than 50 characters')
        .regex(/^[\u0621-\u064A\u0660-\u0669a-zA-Z\s]+$/, 'Username can only contain Arabic or English letters and spaces'),

    countryCode: z.string().min(1, "Please select a country"),
    phone: z
        .string()
        .min(5, "Phone number is too short")
        .max(15, "Phone number is too long")
        .regex(/^\d+$/, "Phone number must contain digits only"),
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required').optional(),

});

// TypeScript type from Zod schema
export type ProfileFormType = z.infer<typeof profileSchema>;



export const emailRequestSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    })
    export type EmailRequestType = z.infer<typeof emailRequestSchema>;