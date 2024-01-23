import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// config for dev mode, if it's not in production, it will store the PrismaClient instance in the globalThis context (which is not affected by hot reload) instead of reinstantianting a new PrismaClient on every hot-reload
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
