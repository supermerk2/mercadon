import { z } from "zod"

export const getCategoriesSchema = z.object({
  params: z
    .object({
      id: z.string({ required_error: "id is required" }),
    })
    .strict(),
})

export const postCategoriesSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "name is required" }),
    })
    .strict(),
})
export type PostCategoriesSchema = z.infer<typeof postCategoriesSchema>

export const putCategoriesSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "name is required" }),
    })
    .strict(),
  params: z.object({
    id: z.string({ required_error: "id is required" }),
  }),
})
export type PutCategoriesSchema = z.infer<typeof putCategoriesSchema>

export const deleteCategoriesSchema = z.object({
  params: z
    .object({
      id: z.string({ required_error: "id is required" }),
    })
    .strict(),
})
