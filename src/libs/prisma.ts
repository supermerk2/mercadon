// TODO: This file is not used, it is just a test to see if we can mock prisma
import { PrismaClient } from "@prisma/client"
// import prismaMock from './__mocks__/prisma.mock'

const prisma = new PrismaClient()

// export default process.env.NODE_ENV === "test" ? prismaMock : prisma
export default prisma
