import z from "zod";


export const uploadImageSchema = z.object({
    image: z.file().min(1).max( 5 * 1024 * 1024).mime(["image/png", "image/jpeg", "image/webp", "image/gif"])
})


export type UploadImageType = z.infer<typeof uploadImageSchema>