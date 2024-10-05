import bcrypt from "bcrypt"
import {User, Account} from '../models/UserModel'
import express from 'express'
import connectDB from '../../../config/connectDB'
import jwt from "jsonwebtoken"

const router = express.Router()


async function handler(req, res) {
    
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from request body
        const { name, username, email, password, confirmPassword } = req.body
        //Connect with database
        connectDB()
        // check if user already exist
        const userExist = await User.findOne(
            {
                $or: [
                    { email: email }, { username: username },
                ]
            }
        )
        //Send error response if duplicate user is found
        if (userExist) {
            res.status(409).json({ message: 'User already exists' })
            return
        }
        
        //Hash password and create new user
        const user = await new User({
            name,
            username,
            email,
            password: bcrypt.hashSync(password, 12),
          })
        await user.save()
        
        if (!user) {
            res.status(500).json({
              statusText: "Unable to create user account",
            })
            return
          }
        const userId = await user._id
        const access_token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {expiresIn:"1d"})
        const expiresAt = Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        console.log("userId is : ", userId)
        console.log("account expiry : ", expiresAt)

        const account = await new Account({
            userId: userId,
            type: "credentials",
            provider: "credentials",
            providerAccountId: userId,
            access_token: access_token,
            expires_at: expiresAt,
            token_type: "bearer",
          })
        await account.save()

        //Send success response
        if (user && account) {
            const {password, ...others} = user._doc
            res.status(200).json({message: 'User created', others,})
          } else {
            res.status(500).json({
              statusText: "Unable to link account to created user profile",
            })
          }
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' })
    }
}

export default handler