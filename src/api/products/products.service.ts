import prisma from "../../libs/prisma"
import { PostProductsSchema } from "./products.schema"

/**
 * Creates a new product in the database.
 * @param requestBody - The request body containing the data for the new product.
 * @returns A promise that resolves to the created product.
 */
export const createById = async (requestBody: PostProductsSchema["body"]) => {
  return prisma.product.create({
    data: requestBody,
  })
}

/**
 * Retrieves all products from the database.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 */
export const readAll = async () => {
  return await prisma.product.findMany()
}

/**
 * Retrieves a product by its ID.
 * @param id - The ID of the product to retrieve.
 * @returns A promise that resolves to the retrieved product.
 */
export const readById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id: parseInt(id) },
    // include: { products: true },
  })
}

/**
 * Updates a product by its ID.
 * @param id - The ID of the product to update.
 * @param requestBody - The updated data for the product.
 * @returns A promise that resolves to the updated product.
 */
export const updateById = async (
  id: string,
  requestBody: PostProductsSchema["body"]
) => {
  return prisma.product.update({
    where: { id: parseInt(id) },
    data: requestBody,
  })
}

/**
 * Deletes a product by its ID.
 * @param id - The ID of the product to delete.
 * @returns A Promise that resolves to the deleted product.
 */
export const deleteById = async (id: string) => {
  return prisma.product.delete({
    where: { id: parseInt(id) },
  })
}
