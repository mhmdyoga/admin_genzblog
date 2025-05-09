import { z } from 'zod';

export const createNewsSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
      image: z
    .any()
    .refine((file) => file instanceof FileList && file.length === 1, {
      message: "Image is required",
    }),
})

export const editNewsSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
    image: z
    .any()
    .refine((file) => file instanceof FileList && file.length === 1, {
      message: "Image is required",
    }),
})

export type CreateNewsType = z.infer<typeof createNewsSchema>;
export type EditNewsType = z.infer<typeof editNewsSchema>;