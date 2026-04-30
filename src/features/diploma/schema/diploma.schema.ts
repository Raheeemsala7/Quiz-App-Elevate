import z from "zod";


export const createDiplomaSchema = z.object({
    title: z.string().nonempty("required"),
    description: z.string().nonempty("required"),
    image: z.string().nonempty("required"),
})

export type CreateDiplomaType = z.infer<typeof createDiplomaSchema>