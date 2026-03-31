import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { expo } from "@better-auth/expo";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL ?? "");
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3001",
  trustedOrigins: [
    "myapp://",
    "exp://",
    "exp://**",
    "exp://196.168.*.*:*/**",
    "exp://192.168.*.*:*/**",
    ...process.env.CORS_ORIGIN?.split(",").map(origin => origin.trim()) ?? [],
  ],
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  plugins: [
    expo(),
    nextCookies(),
    openAPI(),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        enumValues: ["USER", "ADMIN"],
        input: false,
        defaultValue: "USER",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.COOKIE_DOMAIN ?? "localhost",
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
