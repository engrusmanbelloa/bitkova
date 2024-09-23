import connectDB from "../../../config/connectDB"
import Courses from "../models/CourseModel"
import {User} from "../models/UserModel"
import { getToken } from 'next-auth/jwt'


export default async function handler(req, res) {
  if (req.method === "POST") {

    // get user's token
    const token = await getToken({ req })

    // Check if the user is authenticated
    if (!token) {
        return res.status(401).json({ error: 'You are not authorized', data: null })
    }

    const userId = token.sub
    // Connect to the database
    connectDB()

    const { courseIds } = req.body

    try {
        // Find the user in the database and update their purchased courses
        const updatedUser = await User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { enrolledCourses: { $each: courseIds }, activeCourse: { $each: courseIds }}},
          { new: true }
        )
        const addStudent = await Courses.findOneAndUpdate(
          { _id: id },
          { $addToSet: { students: userId} },
          { new: true }
        )
        // Return the updated user object
        res.status(200).json(updatedUser, addStudent)
    } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong" })
    }
  }
}
