import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Request, Response } from "express"
import { beforeEach, describe, expect, test, vi } from "vitest"
import {
  createProductsController,
  deleteProductsByIdController,
  readProductsByIdController,
  readProductsController,
  updateProductsByIdController,
} from "./products.controller"
import {
  createById,
  deleteById,
  readAll,
  readById,
  updateById,
} from "./products.service"

vi.mock("./products.service", () => ({
  createById: vi.fn(),
  readAll: vi.fn(),
  readById: vi.fn(),
  updateById: vi.fn(),
  deleteById: vi.fn(),
}))

describe("readProductsController", () => {
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

  test("should return the products", async () => {
    const products = [
      {
        id: 1,
        categoryId: 1,
        name: "New product",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        categoryId: 1,
        name: "New product",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    vi.mocked(readAll).mockResolvedValueOnce(products)
    const res = await readProductsController(request, response)
    expect(res.json).toHaveBeenCalledWith(products)
  })

  test("should return a 200 status code and a list of products when products are found", async () => {
    const products = [
      {
        id: 1,
        categoryId: 1,
        name: "New product",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        categoryId: 1,
        name: "New product",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    vi.mocked(readAll).mockResolvedValueOnce(products)
    const res = await readProductsController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(products)
  })

  test("should return a 404 status code and a message when products are not found", async () => {
    vi.mocked(readAll).mockResolvedValueOnce([])
    const res = await readProductsController(request, response)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Products not found",
    })
  })
})

describe("readProductsByIdController", () => {
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

  test("should return a product", async () => {
    const product = {
      id: 1,
      categoryId: 1,
      name: "New product",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(readById).mockResolvedValueOnce(product)
    request.params = { id: "1" }
    const res = await readProductsByIdController(request, response)
    expect(res.json).toHaveBeenCalledWith(product)
  })
  test("should return a 200 status code and a product when product is found", async () => {
    const product = {
      id: 1,
      categoryId: 1,
      name: "New product",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(readById).mockResolvedValueOnce(product)
    request.params = { id: "1" }
    const res = await readProductsByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test("should return a 404 status code and a message when product is not found", async () => {
    vi.mocked(readById).mockResolvedValueOnce(null)
    request.params = { id: "1" }
    const res = await readProductsByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Product not found",
    })
  })
})

describe("updateProductsByIdController", () => {
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

  test("should return a product", async () => {
    const product = {
      id: 1,
      categoryId: 1,
      name: "New product",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(updateById).mockResolvedValueOnce(product)
    request.params = { id: "1" }
    request.body = { name: "New Product" }
    const res = await updateProductsByIdController(request, response)
    expect(res.json).toHaveBeenCalledWith(product)
  })

  test("should return a 200 status code and a product when product is found", async () => {
    const product = {
      id: 1,
      categoryId: 1,
      name: "New product",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(updateById).mockResolvedValueOnce(product)
    request.params = { id: "1" }
    request.body = { name: "New Product" }
    const res = await updateProductsByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test("should return a 404 status code and a message when product is not found", async () => {
    request.params = { id: "1" }
    request.body = { name: "New Product" }
    const res = await updateProductsByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Product not found",
    })
  })
})

describe("deleteProductsByIdController", () => {
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

  test("should return a 200 status code when product is found", async () => {
    const product = {
      id: 1,
      categoryId: 1,
      name: "New product",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(deleteById).mockResolvedValueOnce(product)
    request.params = { id: "1" }
    const res = await deleteProductsByIdController(request, response)
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
    const res = await deleteProductsByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: "Prisma error code: P2002",
    })
  })
  test("should return a 404 status code and a message when product is not found", async () => {
    request.params = { id: "1" }
    const res = await deleteProductsByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Product not found",
    })
  })

  test("should return a 500 status code and a message when an error occurs", async () => {
    vi.mocked(deleteById).mockRejectedValueOnce(new Error())
    request.params = { id: "1" }
    const res = await deleteProductsByIdController(request, response)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(new Error())
  })
})

describe("createProductsController", () => {
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

  test("should return a product", async () => {
    const product = {
      id: 1,
      categoryId: 1,
      name: "New product",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(createById).mockResolvedValueOnce(product)
    request.body = { name: "New Product" }
    const res = await createProductsController(request, response)
    expect(res.json).toHaveBeenCalledWith(product)
  })

  test("should return a 200 status code and a product when product is found", async () => {
    const product = {
      id: 1,
      categoryId: 1,
      name: "New product",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    vi.mocked(createById).mockResolvedValueOnce(product)
    request.body = { name: "New Product" }
    const res = await createProductsController(request, response)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test("should return a 400 status code and a message when a PrismaClientError occurs", async () => {
    vi.mocked(createById).mockRejectedValueOnce(
      new PrismaClientKnownRequestError("Error", {
        code: "P2002",
        clientVersion: "2.19.0",
      })
    )
    request.body = { name: "New Product" }
    const res = await createProductsController(request, response)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: "Prisma error code: P2002",
    })
  })

  test("should return a 500 status code and a message when an error occurs", async () => {
    vi.mocked(createById).mockRejectedValueOnce(new Error())
    request.body = { name: "New Product" }
    const res = await createProductsController(request, response)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(new Error())
  })
})
