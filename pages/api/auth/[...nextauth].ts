import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "please provide process.env.NEXTAUTH_SECRET environment variable"
  );
}

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "credentials",
        id: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
        },
        async authorize(credentials) {
          if (
            credentials?.email !== "admin@example.com" ||
            credentials.password !== "@Password123"
          ) {
            throw new Error("Invalid email or password");
          }

          return {
            email: "admin@example.com",
            name: "Admin",
            id: "test-id",
          };
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
  });
}
