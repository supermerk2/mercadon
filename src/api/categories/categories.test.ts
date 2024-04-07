import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Request, Response } from "express"
import { beforeEach, describe, expect, test, vi } from "vitest"
import {
  createCategoriesController,
  deleteCategoriesByIdController,
  readCategoriesByIdController,
  readCategoriesController,
  updateCategoriesByIdController,
} from "./categories.controller"
import {
  createById,
  deleteById,
  readById,
  readCategories,
  updateById,
} from "./categories.service"

vi.mock("./categories.service", () => ({
  createById: vi.fn(),
  readCategories: vi.fn(),
  readById: vi.fn(),
  updateById: vi.fn(),
  deleteById: vi.fn(),
}))

describe("readCategoriesController", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let request: Request<any, any, any, any>
  let response: Response
  beforeEach(() => {
    response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response
    request = {} as Request
  })

  test("should return the categories", async () => {
    const categories = [
      {
        id: 1,
        name: "New Category",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    vi.mocked(readCategories).mockResolvedValueOnce(categories)
    const res = await readCategoriesController(request, response)
    expect(res.json).toHaveBeenCalledWith(categories)
  })

  test("should return a 200 status code and a list of categories when categories are found", async () => {
    const categories = [
      {
        id: 1,
        name: "New Category",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    vi.mocked(readCategories).mockResolvedValueOnce(categories)
    const res = await readCategoriesController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(categories)
  })

  test("should return a 404 status code and a message when categories are not found", async () => {
    vi.mocked(readCategories).mockResolvedValueOnce([])
    const res = await readCategoriesController(request, response)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Categories not found",
    })
  })
})

describe("readCategoriesByIdController", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let request: Request<any, any, any, any>
  let response: Response
  beforeEach(() => {
    response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response
    request = {} as Request
  })

  test("should return a category", async () => {
    const category = {
      id: 1,
      name: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(readById).mockResolvedValueOnce(category)
    request.params = { id: "1" }
    const res = await readCategoriesByIdController(request, response)
    expect(res.json).toHaveBeenCalledWith(category)
  })
  test("should return a 200 status code and a category when category is found", async () => {
    const category = {
      id: 1,
      name: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(readById).mockResolvedValueOnce(category)
    request.params = { id: "1" }
    const res = await readCategoriesByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test("should return a 404 status code and a message when category is not found", async () => {
    vi.mocked(readById).mockResolvedValueOnce(null)
    request.params = { id: "1" }
    const res = await readCategoriesByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Category not found",
    })
  })
})

describe("updateCategoriesByIdController", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let request: Request<any, any, any, any>
  let response: Response
  beforeEach(() => {
    response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response
    request = {} as Request
  })

  test("should return a category", async () => {
    const category = {
      id: 1,
      name: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(updateById).mockResolvedValueOnce(category)
    request.params = { id: "1" }
    request.body = { name: "New Category" }
    const res = await updateCategoriesByIdController(request, response)
    expect(res.json).toHaveBeenCalledWith(category)
  })

  test("should return a 200 status code and a category when category is found", async () => {
    const category = {
      id: 1,
      name: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(updateById).mockResolvedValueOnce(category)
    request.params = { id: "1" }
    request.body = { name: "New Category" }
    const res = await updateCategoriesByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test("should return a 404 status code and a message when category is not found", async () => {
    request.params = { id: "1" }
    request.body = { name: "New Category" }
    const res = await updateCategoriesByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Category not found",
    })
  })
})

describe("deleteCategoriesByIdController", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let request: Request<any, any, any, any>
  let response: Response
  beforeEach(() => {
    response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response
    request = {} as Request
  })

  test("should return a 200 status code when category is found", async () => {
    const category = {
      id: 1,
      name: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(deleteById).mockResolvedValueOnce(category)
    request.params = { id: "1" }
    const res = await deleteCategoriesByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test("should return a 400 status code and a message when a PrismaClientError occurs", async () => {
    vi.mocked(deleteById).mockRejectedValueOnce(
      new PrismaClientKnownRequestError("Error", {
        code: "P2002",
        clientVersion: "2.19.0",
      })
    )
    request.params = { id: "1" }
    const res = await deleteCategoriesByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: "Prisma error code: P2002",
    })
  })
  test("should return a 404 status code and a message when category is not found", async () => {
    request.params = { id: "1" }
    const res = await deleteCategoriesByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Category not found",
    })
  })

  test("should return a 500 status code and a message when an error occurs", async () => {
    vi.mocked(deleteById).mockRejectedValueOnce(new Error())
    request.params = { id: "1" }
    const res = await deleteCategoriesByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(new Error())
  })
})

describe("createCategoriesController", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let request: Request<any, any, any, any>
  let response: Response
  beforeEach(() => {
    response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response
    request = {} as Request
  })

  test("should return a category", async () => {
    const category = {
      id: 1,
      name: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(createById).mockResolvedValueOnce(category)
    request.body = { name: "New Category" }
    const res = await createCategoriesController(request, response)
    expect(res.json).toHaveBeenCalledWith(category)
  })

  test("should return a 200 status code and a category when category is found", async () => {
    const category = {
      id: 1,
      name: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(createById).mockResolvedValueOnce(category)
    request.body = { name: "New Category" }
    const res = await createCategoriesController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test("should return a 400 status code and a message when a PrismaClientError occurs", async () => {
    vi.mocked(createById).mockRejectedValueOnce(
      new PrismaClientKnownRequestError("Error", {
        code: "P2002",
        clientVersion: "2.19.0",
      })
    )
    request.body = { name: "New Category" }
    const res = await createCategoriesController(request, response)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: "Prisma error code: P2002",
    })
  })

  test("should return a 500 status code and a message when an error occurs", async () => {
    vi.mocked(createById).mockRejectedValueOnce(new Error())
    request.body = { name: "New Category" }
    const res = await createCategoriesController(request, response)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(new Error())
  })
})
