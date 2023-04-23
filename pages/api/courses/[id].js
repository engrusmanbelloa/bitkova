import connectDB from "../../../config/connectDB"
import Courses from "../models/CourseModel"
import { getToken } from 'next-auth/jwt'

export const config = {
  api: {
    bodyParser: false
  }
}

// Set up Next.js API route to handle course creation

export default async function handler(req, res) {
  // Connect to the database
  connectDB()

  // get user's token
  const token = await getToken({ req })
  // Check if the user is authenticated
  if (!token) {
    return res.status(401).json({ error: 'You are not authorized', data: null })
  }

  const userId = token.sub
  const { id } = req.query


  if (req.method === 'GET') {
    console.log("Getting course by its id...")
    try {
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

  if (req.method === "POST"){
    try {
    // Find the user in the database and update their purchased courses
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { enrolledCourses: id } },
      { new: true }
    )
    // Return the updated user object
    res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}