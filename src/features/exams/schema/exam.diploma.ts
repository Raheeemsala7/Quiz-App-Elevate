import z from "zod";


export const createExamSchema = z.object({
    title: z.string().nonempty("required"),
    description: z.string().nonempty("required"),
    image: z.string().nonempty("required"),
    duration: z.number().min(1, "required").int("required"),
    diplomaId: z.string().nonempty("required"),
})

export type CreateExamType = z.infer<typeof createExamSchema>
