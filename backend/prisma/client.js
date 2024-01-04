const { PrismaClient } = require("@prisma/client");

const globalForPrisma = globalThis;
const client = globalForPrisma.prisma || new PrismaClient();
module.exports = client;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
