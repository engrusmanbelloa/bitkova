import { IncomingForm } from "formidable"
import { getToken } from 'next-auth/jwt'
import cloudinary from "../../../config/cloudinary"
import connectDB from "../../../config/connectDB"
import Courses from "../models/CourseModel"
import { User } from '../models/UserModel'


export const config = {
  api: {
    bodyParser: false
  }
}

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ 
      multiples: true,
      maxFileSize: 500 * 1024 * 1024, // set the maximum file size to 500 MB
    })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

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
  // console.log("user token is", token)
  const id = token.sub
  const name = token.name

  if (req.method === 'POST') {
    try {
      // destructuring the form data
      const { fields, files } = await asyncParse(req)
      const { image } = files
      const {courseTitle, description, about, duration, price, whatYouWillLearn, content, reviews, lessons, tags} = fields

      let minutes = parseInt(duration)
      const review = JSON.parse(reviews)

      const lessonData = JSON.parse(lessons)
      let lessonsArr = []

      for (let i = 0; i < lessonData.length; i++) {
        try {
          const { title, videos, pdfs } = lessonData[i]

          let lessonObj = {} // create a new object for each lesson
          lessonObj.title = title // Update the title property
          lessonObj.videos = [] // Reset the videos array
          lessonObj.pdfs = [] // Reset the pdfs array

          // Add each video to the lesson
          for (let j = 0; j < videos.length; j++) {
            const video = fields[`lesson-${i}-video-${j}`]
            const { title, link } = lessonData[i].videos[j]
            lessonObj.videos.push({
              title,
              link
            })
          }

          // Add each pdf file to the lesson
          for (let j = 0; j < pdfs.length; j++) {
            const pdf = files[`lesson-${i}-pdf-${j}`]
            const pdfData = await cloudinary.v2.uploader.upload(pdf.filepath, {
              resource_type: 'raw',
              upload_preset: "courses_upload",
              folder: `${courseTitle}/lesson_${i}/pdfs`,
            })
            lessonObj.pdfs.push({
              title: pdf.originalFilename.slice(0, -4),
              link: pdfData.secure_url,
              // publicId: pdfData.public_id,
            })
          }

          // push the current lesson object to the array of lessons
          lessonsArr.push(lessonObj)

        } catch (error) {
          console.log(error)
        }
      }
      
      const {filepath} = image
      const courseImage = await cloudinary.v2.uploader.upload(filepath, {
        folder: `${courseTitle}`,
        public_id: "course-images",
      })
      const imageUrl = courseImage.secure_url

      // Process duration
      let hours = 0
      // let minutes = parseInt(duration)
      if (minutes >= 60) {
        hours = Math.floor(minutes / 60)
        minutes = minutes % 60
      }
      console.log("the duration: ", hours, minutes)
      // process what you'll learn
      let processedWhatToLearn = whatYouWillLearn
      if (typeof processedWhatToLearn === 'string') {
        processedWhatToLearn = processedWhatToLearn.split('!').map((content) => content.trim())
      }
      console.log("the imgUrl, duration, what to learn: ", imageUrl, hours, minutes, processedWhatToLearn,)
      // Process courseContent
      let processedTopic = content
      if (typeof processedTopic === 'string') {
        processedTopic = processedTopic.split('!').map((content) => content.trim())
      }
      console.log("the topics: ", processedTopic,)
      // destructuring the reviews
      const {rating, comment} = review
      
      // Connect to the database
      connectDB()
      // try {
      //   // await Courses.updateMany({}, { $set: { students: [] } })
      //   await User.updateOne({_id: id}, { $set: { ownCourses: [] } })
      //   console.log('Schema updated successfully')
      // } catch (error) {
      //   console.error(error)
      // }
      // check if the course is already exists
      const courseExist = await Courses.findOne({ title: courseTitle })
      if (!courseExist) {
        console.log("no course with same title found............")
        try {
          // Create course object with uploaded file URLs
          console.log("creating the course............")
          const course = new Courses({
            title: courseTitle?.courseTitle,
            shortDesc: description?.description,
            about: about?.about,
            duration: {hours,minutes},
            price: price?.price,
            lessons: lessonsArr?.lessonsArr,
            whatYoullLearn: processedWhatToLearn?.processedWhatToLearn,
            courseContent: processedTopic?.processedTopic,
            reviews: {name, rating, comment},
            image: imageUrl?.imageUrl,
            owner: id,
            tags: tags?.tags,
            })
          console.log("saving the course............")
          // Save course to database
          await course.save()
          // Add the course ID to the tutor's ownCourses array
          const tutor = await User.findOneAndUpdate(
            { _id: id },
            { $addToSet: { ownCourses: course._id } },
            { new: true }
          )
          console.log("course saved!!!!")
          const { password, ...user } = tutor._doc
          res.status(201).json({ success: true, course })
          console.log("Created course detail....", course, user)
        }
        catch(err) {
          res.status(500).json({ message: 'course not created' })
          console.log("something is wrong", err)
        }} else {
          res.status(409).json({error: "the course is already exist"})
          console.log("course with same name found............")
        }   
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: 'Something went wrong' })
    }
  }
}