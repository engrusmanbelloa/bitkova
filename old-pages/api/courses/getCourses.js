import connectDB from "../../../config/connectDB"
import Courses from "../models/CourseModel"

export const config = {
  api: {
    bodyParser: false
  }
}

// Set up Next.js API route to handle course creation
export default async function handler(req, res) {
  console.log("Getting courses...")
  // Connect to the database
  connectDB()

  if (req.method === 'GET') {
    const limit = 10 
    const skip = 0 
    try {
      const courses = await Courses.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      res.status(200).json(courses)
      // console.log(courses)
    }catch (error) {
      res.status(500).json({ error: 'Error getting courses', details: error.message })
    }
  }
}

