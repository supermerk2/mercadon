import prisma from "../../libs/prisma"
import { PostCategoriesSchema } from "./categories.schema"

/**
 * Creates a new category in the database based on the provided request body.
 * @param requestBody - The request body containing the data for the new category.
 * @returns A promise that resolves to the created category.
 */
export const createById = async (requestBody: PostCategoriesSchema["body"]) => {
  return prisma.category.create({
    data: requestBody,
  })
}

/**
 * Retrieves all categories from the database.
 * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
 */
export const readCategories = async () => {
  return await prisma.category.findMany()
}

/**
 * Retrieves a category by its ID.
 * @param id - The ID of the category to retrieve.
 * @returns A promise that resolves to the category object, or null if not found.
 */
export const readById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id: parseInt(id) },
    // include: { products: true },
  })
}

/**
 * Updates a category by its ID.
 * @param id - The ID of the category to update.
 * @param requestBody - The updated data for the category.
 * @returns A promise that resolves to the updated category.
 */
export const updateById = async (
  id: string,
  requestBody: PostCategoriesSchema["body"]
) => {
  return prisma.category.update({
    where: { id: parseInt(id) },
    data: requestBody,
  })
}

/**
 * Deletes a category by its ID.
 * @param id - The ID of the category to delete.
 * @returns A Promise that resolves to the deleted category.
 */
export const deleteById = async (id: string) => {
  return prisma.category.delete({
    where: { id: parseInt(id) },
  })
}
