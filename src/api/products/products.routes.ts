import { Router } from "express"
import { schemaValidationMiddleware } from "../../middlewares/schemaValidation.middleware"
import {
  createProductsController,
  deleteProductsByIdController,
  readProductsByIdController,
  readProductsController,
  updateProductsByIdController,
} from "./products.controller"
import { postProductsSchema, putProductsSchema } from "./products.schema"

export const productsRouter = Router()

productsRouter.get("/products", readProductsController)
productsRouter.get("/products/:id", readProductsByIdController)
productsRouter.put(
  "/products/:id",
  schemaValidationMiddleware(putProductsSchema),
  updateProductsByIdController
)
productsRouter.post(
  "/products",
  schemaValidationMiddleware(postProductsSchema),
  createProductsController
)
productsRouter.delete("/products/:id", deleteProductsByIdController)
