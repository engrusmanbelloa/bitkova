import { getToken } from 'next-auth/jwt'
import connectDB from "../../../config/connectDB"
import {User} from "../models/UserModel"

export const config = {
  api: {
    bodyParser: false
  }
}

// Set up Next.js API route to handle get usser
export default async function handler(req, res) {
  console.log("Getting user...")
  // get user's token
  const token = await getToken({ req })

  // Check if the user is authenticated
  if (!token) {
    return res.status(401).json({ error: 'You are not authorized', data: null })
  }

  //Check if the authenticated user is an administrator
  // if (!token.isAdmin){
  //   return res.status(401).json({ error: 'You are not authorized to perform this action', data: null })
  // }

  const id = token.sub
  
  // Connect to the database
  connectDB()

  if (req.method === 'GET') {
      try {
        const user = await User.findById(id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
      }catch (error) {
        res.status(500).json({error: 'Error getting user'})
      }
    }
}