import express from 'express'
import connectDB from '../../../config/connectDB'
import {User, Account, Session} from '../models/UserModel'
import NextAuth from 'next-auth'
import multer from 'multer'

// // const nextAuth = require('next-auth')
// import nextConnect from 'next-connect'
// // const mongodb = require('mongodb')
// const handler = nextConnect()
// handler.use(nextAuth.middleware)

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })
console.log("The middle to check if the user is authenticated is ", NextAuth.middleware)

// UPDATE
// router.put('/profile/:id', upload.single('image'), NextAuth.middleware, async (req, res) => {
    
//   })
router.put('/profile:id', upload.single('image'), NextAuth.middleware, async (req, res) => {
    try {
        const { user } = req.auth
        const { id } = req.params
        console.log(id)
        const { fullname, email, username, phone, bio } = req.body

        if (!id) {
            return res.status(401).json({ error: 'Not authenticated' })
          }
        
        // Check if the authenticated user is an administrator

        // Store the profile picture in MongoDB as a binary object
        const buffer = req.file.buffer
         // connect to db
         connectDB()

        // Update the user's profile in the database using the userId and the data from the request body
        const updatedUser = await User.findByIdAndUpdate(id, {
            fullname,
            email,
            username,
            phone,
            bio,
            image: buffer
        }, { new: true })
        res.status(200).json({ message: 'Profile updated successfully', updatedUser })
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' })
    }
  })

  export default router