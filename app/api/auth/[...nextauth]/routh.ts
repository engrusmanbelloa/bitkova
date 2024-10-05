import { handlers } from "@/auth"
import NextAuth from "next-auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import {User, Account, Session} from '@/models/UserModel'
import connectDB from '@/config/connectDB'
import bcrypt from 'bcrypt'
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"

// const handler = NextAuth({
//         // Configure one or more authentication providers
//         adapter: MongoDBAdapter(clientPromise),
//         session: {
//           strategy: "jwt",
//           maxAge: 60 * 60 * 24,
//           // updateAge: 24 * 60 * 60,
//           // generateSessionToken: () => {
//           //   return randomUUID?.() ?? randomBytes(32).toString("hex")
//           // }    
//         },
//         providers: [
//             GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//             allowDangerousEmailAccountLinking: true,
//             }),
//             // FacebookProvider({
//             //     clientId: process.env.FACEBOOK_CLIENT_ID,
//             //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET
//             // }),
//           // ...add more providers here
//         ],
//       events: {
//           async signIn(message) {
//             if (message?.isNewUser) {
//               const { email } = message.user
//               console.log("the user is new", message.isNewUser)
    
//               // Add custom fields to user object
//               // message.user.username = ""
//               // message.user.walletAddress = ""
//               // message.user.phone = null
//               // message.user.isAdmin = false
//               // message.user.isTutor = false
//               // message.user.enrolledCourses = []
//               // message.user.activeCourse = []
//               // message.user.completedCourses = []
//               // message.user.wishlsit = []
//               // message.user.bio = ""
//               // message.user.createdAt = Date.now()
//               // message.user.updatedAt = Date.now()
//               // message.user.ownCourses = null
//               // message.user.points = null
    
//               // Save user object to database
//               try {
//                 // Connect to database
//                 connectDB()
//                 console.log("Connecting to database")
//                 const existingUser = await User.findOne({email})
//                 if (existingUser) {
//                   // If user already exists, update the user document with the new data
//                   await User.updateOne({email}, {$set: message.user})
//                   console.log("successfully updated user document")
//                 }else {
//                   // If user doesn't exist, create a new user document
//                   await User.create({email, ...message.user})
//                 }
//               } catch (error) {
//                 console.log(error)
//                 throw new Error('Could not connect to database')
//               }
//             }
//           },
//         },
    
//         pages: {
//           signIn: '/signin',
//           signOut: '/signout',
//           error: '/auth/error', // Error code passed in query string as ?error=
//           verifyRequest: '/auth/verify-request', // (used for check email message)
//           // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//         },
    
//       //    callbacks for the sessions
//       callbacks: {
//         async redirect({ url, baseUrl }) {
//           // Allows relative callback URLs
//           if (url.startsWith("/")) return `${baseUrl}${url}`
//           // Allows callback URLs on the same origin
//           else if (new URL(url).origin === baseUrl) return url
//           return baseUrl
//         },
//         async signIn({ user, account, profile, email, credentials,}) {
//           return true
//         },
//         async session({ session, token, user }) {
//           try {
//             // session.user.id = token.sub
//             // session.user.isAdmin = token.isAdmin
//             // session.user.isTutor = token.isTutor
//             // session.user.username = token.username
//             // session.user.phone = token.phone
//             // session.user.bio = token.bio
//             // session.user.joined = token.joined
//             // session.user.enrolledCourses = token.enrolledCourses
//             // session.user.activeCourse = token.activeCourse
//             // session.user.completedCourses = token.completedCourses
//             // session.user.wishlsit = token.wishlsit
//             // session.user.poits = token.points,
//             // session.user.activeCourse = token.activeCourse,
//             // session.user.completedCourses = token.completedCourses,
//             // session.user.ownCourses = token.ownCourses,
//             // session.user.enrolledCourses = token.enrolledCourses,
//             // session.user.access_token = token.access_token
//           } catch (error) {
//             console.error(error)
//           }
//           // console.log("user session", session)
//           return session
//         },
//         async jwt({ token, user, account, profile, isNewUser }) {
//           if (user) {
//             // token.isAdmin = user.isAdmin
//             // token.isTutor = user.isTutor
//             // token.username = user.username
//             // token.phone = user.phone
//             // token.bio = user.bio        
//             // token.joined = user.createdAt
//             // token.enrolledCourses = user.enrolledCourses
//             // token.activeCourse = user.activeCourse
//             // token.completedCourses = user.completedCourses
//             // token.wishlsit = user.wishlsit,
//             // token.points = user.points,
//             // token.activeCourse = user.activeCourse,
//             // token.completedCourses = user.completedCourses,
//             // token.ownCourses = user.ownCourses,
//             // token.enrolledCourses = user.enrolledCourses,
//             // token.access_token = account.access_token
//           }
//           console.log("user token", token)
//           return token
//         }
//       }
      
// })

// export { handler as GET, handler as POST }


// export const { GET, POST } = handlers