import "dotenv/config"
import express from "express"
import { categoriesRouter } from "./api/categories/categories.routes"
import { productsRouter } from "./api/products/products.routes"

const app = express()

app.use(express.json())

app.use("/api", productsRouter)
app.use("/api", categoriesRouter)

app.listen(process.env.PORT)
console.log(`Server running on port ${process.env.PORT}`)
