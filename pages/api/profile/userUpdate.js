import { IncomingForm } from "formidable"
import { getToken } from 'next-auth/jwt'
import cloudinary from "../../../config/cloudinary"
import connectDB from "../../../config/connectDB"
import {User} from "../models/UserModel"
export const config = {
  api: {
    bodyParser: false
  }
}

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

export default async function handler(req, res) {
  console.log("Receiving")
  // get user's token
  const token = await getToken({ req })
  if (!token) {
    return res.status(401).json({ error: 'You are not signed in', data: null })
  }
  console.log("user toke is", token)
  const id = token.sub
  // // get user's data from the db
  // if (req.method === "GET") {
  //   try {
  //     const user = await User.findById(id)
  //     const { password, ...others } = user._doc
  //     res.status(200).json(others)
  //   } catch (err) {
  //     res.status(500).json(err)
  //   }
  // }
  // update the user data in the db
  if (req.method === "PUT") {
    try {
      // const result = await asyncParse(req)
      const { fields, files } = await asyncParse(req)
      const { fullname, username, phone, bio } = fields

      const phoneString = phone[0].replace(/\D/g, '')

      const phoneNumber = parseInt(phoneString)
      const fullName = fullname.join()
      const userName = username.join()
      const biography = bio.join()
      // console.log("user form detail", id, fullName, phoneNumber, userName, biography)
     
      const {image} = files
      const path = image[0].filepath

      // delete the previous image if it exists in the cloudinary and insert new one
      if (token.picture.includes("cloudinary")) {
        const publicId = token.picture.split('/').pop().split('.')[0]
        cloudinary.uploader.destroy(publicId, function(result) {
          console.log("user image destroy", result)
        })
      }
      // Upload
      console.log("starting img upload...")

      const imgLink = await cloudinary.v2.uploader.upload(path, {
        folder: "users",
        upload_preset: "user_profile",
        // transformation: [
        //   {
        //     width: 150,
        //     height: 150,
        //     crop: "thumb",
        //     gravity: "face",
        //   },
        // ],
      })
      const imageUrl = imgLink.secure_url

      // Check if the authenticated user is an administrator
      // Connect to the database
      connectDB()

      // check if user already exist
      const usernameExist = await User.findOne({ username: userName })
      if (!usernameExist) {
        console.log("no user with same username found............")
        try {
          const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
              image: imageUrl || token.picture,
              name: fullName,
              username: userName,
              phone: phoneNumber,
              bio: biography
            } 
          },
            { new: true }
          )
          console.log("user updated detail....", updatedUser)
          res.status(200).json({ message: 'Profile updated successfully', updatedUser })
        }
        catch(err) {
        res.status(500).json({ message: 'user not updated' })
      }} else {
        res.status(404).json(err)
        console.log("user with same username found............")
      } // return user
    }catch(err){
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}