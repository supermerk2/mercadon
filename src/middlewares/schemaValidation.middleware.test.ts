import { NextFunction, Request, Response } from "express"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { z } from "zod"
import { schemaValidationMiddleware } from "./schemaValidation.middleware"

describe("schemaValidationMiddleware", () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response
    next = vi.fn() as unknown as NextFunction
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test("should call next if schema validation passes", () => {
    const schema = z.object({
      body: z.string(),
      query: z.object({ key: z.string() }),
      params: z.object({ test: z.string() }),
    })

    req.body = "test"
    req.query = { key: "test" }
    req.params = { test: "test" }

    schemaValidationMiddleware(schema)(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  test("should return 400 status code with error messages if schema validation fails", () => {
    const schema = z.object({
      body: z.string({
        invalid_type_error: "Invalid value supplied for 'body'",
      }),
    })

    req.body = 123 // Invalid type

    schemaValidationMiddleware(schema)(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith([
      { message: "Invalid value supplied for 'body'" },
    ])
  })

  test("should return 500 status code with error message if an unexpected error occurs", () => {
    const schema = z.object({
      body: z.string(),
    })

    req.body = "test"

    const error = new Error("Internal server error")

    schema.parse = vi.fn().mockImplementation(() => {
      throw error
    })

    schemaValidationMiddleware(schema)(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(error)
  })
})
