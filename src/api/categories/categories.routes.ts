import { Router } from "express"
import { schemaValidationMiddleware } from "../../middlewares/schemaValidation.middleware"
import {
  createCategoriesController,
  deleteCategoriesByIdController,
  readCategoriesByIdController,
  readCategoriesController,
  updateCategoriesByIdController,
} from "./categories.controller"
import {
  deleteCategoriesSchema,
  getCategoriesSchema,
  postCategoriesSchema,
  putCategoriesSchema,
} from "./categories.schema"

export const categoriesRouter = Router()

categoriesRouter.get("/categories", readCategoriesController)
categoriesRouter.get(
  "/categories/:id",
  schemaValidationMiddleware(getCategoriesSchema),
  readCategoriesByIdController
)
categoriesRouter.put(
  "/categories/:id",
  schemaValidationMiddleware(putCategoriesSchema),
  updateCategoriesByIdController
)
categoriesRouter.post(
  "/categories",
  schemaValidationMiddleware(postCategoriesSchema),
  createCategoriesController
)
categoriesRouter.delete(
  "/categories/:id",
  schemaValidationMiddleware(deleteCategoriesSchema),
  deleteCategoriesByIdController
)
