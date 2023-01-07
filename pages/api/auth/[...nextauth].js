import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../auth/lib/mongodb"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// pages/api/auth/lib/mongodb.ts
// ../../../lib/mongodb

export const authOptions = {
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
      // ...add more providers here
    ],

//    callbacks for the sessions
callbacks: {
  // async jwt({ token, account }) {
  //   // Persist the OAuth access_token to the token right after signin
  //   if (account) {
  //     token.accessToken = account.access_token
  //   }
  //   return token
  // },
  // async session({ session, token, user }) {
  //   // Send properties to the client, like an access_token from a provider.
  //   session.accessToken = token.accessToken
  //   return session
  // }
}

  }
  export default NextAuth(authOptions);
