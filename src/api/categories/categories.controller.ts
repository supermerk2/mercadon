import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Request, Response } from "express"
import { PutCategoriesSchema } from "./categories.schema"
import {
  createById,
  deleteById,
  readById,
  readCategories,
  updateById,
} from "./categories.service"

export const createCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await createById(req.body)
    return res.status(200).json(category)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res
        .status(400)
        .json({ message: `Prisma error code: ${error.code}` })
    }
    return res.status(500).json(error)
  }
}

export const readCategoriesController = async (
  _req: Request,
  res: Response
) => {
  const categories = await readCategories()

  if (!categories?.length) {
    return res.status(404).json({ message: "Categories not found" })
  }
  return res.status(200).json(categories)
}

export const readCategoriesByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params
  const category = await readById(id)
  if (!category) {
    return res.status(404).json({ message: "Category not found" })
  }

  return res.status(200).json(category)
}

export const updateCategoriesByIdController = async (
  req: Request<
    PutCategoriesSchema["params"],
    undefined,
    PutCategoriesSchema["body"]
  >,
  res: Response
) => {
  try {
    const { id } = req.params
    const category = await updateById(id, req.body)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }
    return res.status(200).json(category)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res
        .status(400)
        .json({ message: `Prisma error code: ${error.code}` })
    }
    return res.status(500).json(error)
  }
}

export const deleteCategoriesByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const category = await deleteById(id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }
    return res.status(200).json(category)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res
        .status(400)
        .json({ message: `Prisma error code: ${error.code}` })
    }
    return res.status(500).json(error)
  }
}
