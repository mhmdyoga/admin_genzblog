import { z } from 'zod';

export const CategorySchema = z.object({
    name: z.string().min(3).max(10)
});

export const editCategorySchema = z.object({
    name: z.string().min(3).max(10)
});

export type CategotySchemaType = z.infer<typeof CategorySchema>
export type EditCategorySchemaType = z.infer<typeof editCategorySchema>
