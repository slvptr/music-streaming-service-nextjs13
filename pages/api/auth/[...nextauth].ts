import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    // signIn: "/auth/sign-in",
  },
};
export default NextAuth(authOptions);
