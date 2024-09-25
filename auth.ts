import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Apple, Google],
})