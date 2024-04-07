import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    // globals: true,
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      categories: "/src/api/categories",
      products: "/src/api/products",
      libs: "/src/libs",
      middlewares: "/src/middlewares",
    },
  },
})
