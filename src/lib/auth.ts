import NextAuth, { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";

const AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID;
const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET;
const AUTH_SECRET = process.env.AUTH_SECRET;

if (!AUTH_GOOGLE_ID || !AUTH_GOOGLE_SECRET || !AUTH_SECRET) {
  throw new Error("Missing Google Environmental Variables");
}

const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [GoogleProvider],
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
