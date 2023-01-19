import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../auth/lib/mongodb"
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt'
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { ObjectId } from "mongodb"

// Modules needed to support key generation, token encryption, and HTTP cookie manipulation 
import { randomUUID } from 'crypto'
import { setCookie, getCookie } from 'cookies-next';
import { encode, decode } from 'next-auth/jwt'



const MONGODB_URI = process.env.MONGODB_URI
// next auth starts here

export default async function handler(req, res) {
  const adapter = MongoDBAdapter(clientPromise)
  
  let userAccount = null
  // Do whatever you want here, before the request is passed down to `NextAuth`
  const generate = {}
  generate.uuid = function () {
    return uuidv4()
  }

  generate.uuidv4 = function () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
// Helper functions to generate unique keys and calculate the expiry dates for session cookies
  const generateSessionToken = () => {
    // Use `randomUUID` if available. (Node 15.6++)
    return randomUUID?.() ?? generate.uuid()
  }

  const fromDate = (time, date = Date.now()) => {
    return new Date(date + time * 1000)
  }

  //    callbacks for the sessions
const callbacks = {
  async redirect({ url, baseUrl }) {
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  },
  async signIn({ user, account, profile, email, credentials }) {
    console.log("User Signin Start: ", account)
    // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
    if (req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
      if (user) {
          const sessionToken =  generateSessionToken()
          const sessionMaxAge = 60 * 60 * 24 * 7; //7Days
          const sessionExpiry = fromDate(sessionMaxAge)

          console.log("Session token is: ", sessionToken)
          console.log("sessionExpiry: ", sessionExpiry);
          console.log("user.id: ", user.id)
           
          const userId = user.id
          console.log("userId", userId)
         
          const expires = sessionExpiry
          await adapter.createSession({
            _id: userId,
            sessionToken: sessionToken,
            userId: userId,
            expires: expires
          })

          // await adapter.createSession({
          //     sessionToken,
          //     userId,
          //     expires
          // })
          
          setCookie("next-auth.session-token", sessionToken, {
            expires: sessionExpiry,
            req: req,
            res: res,
          })
          console.log("user Session: ", await adapter.createSession({
            id: userId,
            sessionToken: sessionToken,
            userId: ObjectId(userId),
            expires: expires,
        }))
         
      }   
  }
    return true
  },

  async session({ session, token, user}) {

    console.log("Session. Got User: ", session, token)
    if (user !== null) {
      console.log("UserAccount Session Generation: ", user)
      session.user = {
        name: user.name,
        email: user.email,
      };
    console.log("Session.user: ", session.user)
    // return session
  }
  if (
    token && typeof token.user !== typeof undefined && (typeof session.user === typeof undefined ||
      (typeof session.user !== typeof undefined && typeof session.user.id === typeof undefined))
  ) {
    session.user = token.user
  }
  if (typeof token !== typeof undefined) {
    session.token = token
  }
  console.log("Session: ", session)
  return session
},

async jwt({ token, user, account, profile, isNewUser }) {
  console.log("JWT callback. Got User: ", user)
  if (typeof user !== typeof undefined) {
    token.user = user;
  }
  return token
},
}

  const options = {
      session: {
              strategy: "database",
              maxAge: 7 * 24 * 60 * 60,
              updateAge: 24 * 60 * 60,
              // generateSessionToken: () => {
              //   return randomUUID?.() ?? randomBytes(32).toString("hex")
              // }    
            },
      cookies: {
              sessionToken: {
                name: "next-auth.session-token",
                options: {
                  httpOnly: true,
                  sameSite: "lax",
                  path: "/",
                  secure: process.env.NODE_ENV === "production",
                },
              },
            },
      jwt: {
        // Customize the JWT encode and decode functions to overwrite the default behaviour of storing the JWT token in the session cookie when using credentials providers. Instead we will store the session token reference to the session in the database.
        encode: async (token, secret, maxAge) => {
            if (req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
                // const cookies = new Cookies(req,res)

                // const cookie = cookies.get('next-auth.session-token')
                const cookie = getCookie("next-auth.session-token", { req: req });

                console.log("pure Cookie: ", cookie);

                if(cookie) return cookie
                else return ''

            }
            // Revert to default behaviour when not in the credentials provider callback flow
            return encode(token, secret, maxAge)
        },
        decode: async (token, secret) => {
            if (req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
                return null
            }

            // Revert to default behaviour when not in the credentials provider callback flow
            return decode(token, secret)
        }
      },
      debug: process.env.NODE_ENV === "development",
      adapter,
      secret: process.env.NEXTAUTH_SECRET,
      providers: [

        CredentialsProvider({
          name: 'Credentials',
          async authorize(credentials, req) {
            const client = new MongoClient(MONGODB_URI, {},) 
            try {
                await client.connect()
            } catch (e) {
                console.error(e)
            }
            const email = credentials.email
            const password = credentials.password
            //Get all the users
            const users = client.db().collection('users')
            const sessions = client.db().collection('sessions')
            //Find user with the email  
            const user = await users.findOne(
              {
                  $or: [
                      { email: email }, { username: email }
                  ]
              }
            )

          //   //Not found - send error res
            if (!user) {
                client.close();
                throw new Error('No user found with this credential')
            }

            console.log("Authorize User Credentials: ", user)
            //Check hased password with DB password
            const checkPassword = bcrypt.compareSync(password, user.password)
            //Incorrect password - send response
            if (!checkPassword) {
                client.close();
                throw new Error('Password doesnt match')
            }
            //Incorrect password - send response
            if (!checkPassword) {
                client.close();
                throw new Error('Password doesnt match')
            }
            //Else send success response
            client.close();
            return {
            id: user._id,
            name: user.name,
            email: user.email,
          }
        },
          
        }),
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
      // ...add more providers here
    ],
    callbacks: callbacks,
    pages: {
      signIn: '/signin',
      signOut: '/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
      verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }, 
    
  }

  return await NextAuth(req, res, options)

}


// export const authOptions = {
//     // Configure one or more authentication providers
//     adapter: MongoDBAdapter(clientPromise),
//     session: {
//       strategy: "jwt",
//       maxAge: 3000,
//       updateAge: 24 * 60 * 60,
//       // generateSessionToken: () => {
//       //   return randomUUID?.() ?? randomBytes(32).toString("hex")
//       // }    
//     },
//     // jwt: {
//     //   async encode({ token }) {
//     //     return jwt.sign(token as {}, process.env.JWT_SECRET!);
//     //   },
//     //   async decode({ token }) {
//     //     return jwt.verify(token!, process.env.JWT_SECRET!) as JWT;
//     //   },
//     // },
//     // jwt: {
//     //   async encode({ secret, token }) {
//     //     return jwt.sign(token, secret)
//     //   },
//     //   async decode({ secret, token }) {
//     //     return jwt.verify(token, secret)
//     //   },
//     // },
//     providers: [
//         CredentialsProvider({
//           name: 'Credentials',
//           async authorize(credentials, req) {
//             const client = new MongoClient(MONGODB_URI, {},) 
//             try {
//                 await client.connect()
//             } catch (e) {
//                 console.error(e)
//             }
//             const email = credentials.email
//             const password = credentials.password
//             //Get all the users
//             const users = client.db().collection('users')
//             //Find user with the email  
//             const user = await users.findOne({
//                 email: email,
//             });
//             //Not found - send error res
//             if (!user) {
//                 client.close();
//                 throw new Error('No user found with the email')
//             }
//             //Check hased password with DB password
//             const checkPassword = bcrypt.compareSync(password, user.password)
//             //Incorrect password - send response
//             if (!checkPassword) {
//                 client.close();
//                 throw new Error('Password doesnt match')
//             }
//           //   //Check jwt token with DB token
//           //   const curentToken = jwt.sign({email, password}, process.env.JWT_SECRET)
//           //   const checkToken = jwt.verify(user.token, process.env.JWT_SECRET)
//           //   if (checkToken === curentToken) {
//           //     client.close();
//           //     throw new Error('you are not allowed')
//           // }
//             //Incorrect password - send response
//             if (!checkPassword) {
//                 client.close();
//                 throw new Error('Password doesnt match')
//             }
//             //Else send success response
//             client.close();
//             return {
//               name: result.name,
//               email: result.email,
//               // image: result.image, 
//             };
//         },
          
//         }),
//         GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         allowDangerousEmailAccountLinking: true,
//         }),
//         FacebookProvider({
//             clientId: process.env.FACEBOOK_CLIENT_ID,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET
//         }),
//       // ...add more providers here
//     ],

//     pages: {
//       signIn: '/signin',
//       signOut: '/signout',
//       error: '/auth/error', // Error code passed in query string as ?error=
//       verifyRequest: '/auth/verify-request', // (used for check email message)
//       // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//     },

// // SQL or MongoDB database (or leave empty)
// // database: process.env.DATABASE_URL,


// //    callbacks for the sessions
// callbacks: {
//   async redirect({ url, baseUrl }) {
//     // Allows relative callback URLs
//     if (url.startsWith("/")) return `${baseUrl}${url}`
//     // Allows callback URLs on the same origin
//     else if (new URL(url).origin === baseUrl) return url
//     return baseUrl
//   },
//   async signIn({ user, account, profile, email, credentials }) {
//     // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
//     if (req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
//       if (user) {
//           const sessionToken = generateSessionToken()
//           const sessionExpiry = fromDate(session.maxAge)
          
//           await adapter.createSession({
//               sessionToken: sessionToken,
//               userId: user.id,
//               expires: sessionExpiry
//           })

//           const cookies = new Cookies(req,res)

//           cookies.set('next-auth.session-token', sessionToken, {
//               expires: sessionExpiry
//           })
//       }   
//   }
//     return true
//   },
//   async session({ session, token, user }) {
//     return session
//   },
//   async jwt({ token, user, account, profile, isNewUser }) {
//     return token
//   }
// }



//   }
// export default NextAuth(authOptions);
