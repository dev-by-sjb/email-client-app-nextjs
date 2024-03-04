import { PrismaClient } from "@prisma/client";

const globalsForPrisma = globalThis as unknown as {
  db: PrismaClient | undefined;
};

export const db = globalsForPrisma.db ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalsForPrisma.db = db;
