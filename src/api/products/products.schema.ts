import { z } from "zod"

export const postProductsSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "name is required" }),
      price: z.number().optional(),
      categoryId: z.number({ required_error: "categoryId is required" }),
    })
    .strict(),
})
export type PostProductsSchema = z.infer<typeof postProductsSchema>

export const putProductsSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "name is required" }),
      price: z.number().optional(),
      categoryId: z.number({ required_error: "categoryId is required" }),
    })
    .strict(),
  params: z
    .object({
      id: z.string({ required_error: "id is required " }),
    })
    .strict(),
})
export type PutProductsSchema = z.infer<typeof putProductsSchema>
