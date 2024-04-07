import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Request, Response } from "express"
import { PutProductsSchema } from "./products.schema"
import {
  createById,
  deleteById,
  readAll,
  readById,
  updateById,
} from "./products.service"

export const createProductsController = async (req: Request, res: Response) => {
  try {
    const product = await createById(req.body)
    return res.status(200).json(product)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res
        .status(400)
        .json({ message: `Prisma error code: ${error.code}` })
    }
    return res.status(500).json(error)
  }
}

export const readProductsController = async (_req: Request, res: Response) => {
  const products = await readAll()

  if (!products?.length) {
    return res.status(404).json({ message: "Products not found" })
  }
  return res.status(200).json(products)
}

export const readProductsByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params
  const product = await readById(id)
  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }
  return res.status(200).json(product)
}

export const updateProductsByIdController = async (
  req: Request<
    PutProductsSchema["params"],
    undefined,
    PutProductsSchema["body"]
  >,
  res: Response
) => {
  const { id } = req.params
  try {
    const product = await updateById(id, req.body)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    return res.status(200).json(product)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res
        .status(400)
        .json({ message: `Prisma error code: ${error.code}` })
    }
    return res.status(500).json("Internal Server Error")
  }
}

export const deleteProductsByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const product = await deleteById(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    return res.status(200).json(product)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res
        .status(400)
        .json({ message: `Prisma error code: ${error.code}` })
    }
    return res.status(500).json(error)
  }
}
