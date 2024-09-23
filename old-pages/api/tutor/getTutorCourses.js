import { IncomingForm } from "formidable"
import { getToken } from 'next-auth/jwt'
import cloudinary from "../../../config/cloudinary"
import connectDB from "../../../config/connectDB"
import Courses from "../models/CourseModel"
const _ = require('lodash')

export const config = {
  api: {
    bodyParser: false
  }
}

// Set up Next.js API route to handle course creation
export default async function handler(req, res) {
  console.log("Receiving")

  // get user's token
  const token = await getToken({ req })
  // Check if the user is authenticated
  if (!token) {
    return res.status(401).json({ error: 'You are not authorized', data: null })
  }
  // Check if the authenticated user is an administrator
  // if (!token.isAdmin || token.isTutor){
  //   return res.status(401).json({ error: 'You are not authorized to perform this action', data: null })
    // }
  console.log("user token is", token)
  const id = token.sub
  const name = token.name

  // Connect to the database
  connectDB()

  if (req.method === 'GET') {
    try {
      const courses = await Courses.find({ owner: id }).populate('owner')
      res.status(200).json(courses)
    }catch (error) {
      res.status(500).json({ error: 'Error getting courses' })
    }
  }
}