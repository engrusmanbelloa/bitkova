import connectDB from "../../../config/connectDB"
import Courses from "../models/CourseModel"

export const config = {
  api: {
    bodyParser: false
  }
}

// Set up Next.js API route to handle course creation
export default async function handler(req, res) {
  
  // Connect to the database
  connectDB()

  if (req.method === 'GET') {
    console.log("Getting course by its id...")
    try {
        const { id } = req.query
        console.log("courseId: ", id)
        // Find the course in the database by its ID
        const course = await Courses.findById(id)
        // If the course is found, return it as a JSON response
        if (course) {
            res.status(200).json(course)
        } else {
            res.status(404).json({ error: 'Course not found' })
        }
    }catch (error) {
      res.status(500).json({ error: 'Error getting courses' })
    }
  }
}