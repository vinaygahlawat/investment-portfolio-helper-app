import { PrismaClient } from "@prisma/client";

// Declaring a global variable to avoid unintended multiple db connections due to events like hot-loading.
declare global {
  var prisma: PrismaClient | undefined;
}

// Singleton Prisma Client
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
