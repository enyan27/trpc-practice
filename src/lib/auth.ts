import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { polarClient } from "./polar";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  socialProviders: { github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET } },
  session: { cookieCache: { enabled: true } },
  plugins: [
    admin(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [{ productId: "ec276ee0-ca00-42f0-8f4b-e2051d2ff527", slug: "pro" }],
          successUrl: "/",
          authenticatedUsersOnly: true
        }),
        portal()
      ]
    })
  ]
});
