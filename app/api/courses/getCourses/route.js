import connectDB from "@/config/connectDB"
import Courses from "@/models/CourseModel"

// Set up Next.js API route to handle course creation
export async function GET() {
// export default async function handler(req, res) {
  console.log("Getting courses...")
  // Connect to the database
  connectDB()
  const limit = 10 
  const skip = 0 
  // Fetch courses from the database and return them in descending order (most recent first) with a limit of 10 and a skip of 0
  try {
    const courses = await Courses.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    // console.log(courses)
    return Response.json({ courses })
    
  }catch (error) {
    return Response.status(500).json({ error: 'Error getting courses', details: error.message })
  }

}

