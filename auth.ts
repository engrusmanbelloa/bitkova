import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"
export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  adapter: MongoDBAdapter(client),
  providers: [Apple, Google],
})