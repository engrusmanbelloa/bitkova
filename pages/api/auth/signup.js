
import { MongoClient } from 'mongodb';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { use } from 'react';
import { ObjectId } from "mongodb"
import cuid from 'cuid'
// import clientPromise from "../auth/lib/mongodb"


async function handler(req, res) {
    const MONGODB_URI = process.env.MONGODB_URI
    const createdAt = new Date(Date.now())
    var passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { name, username, email, password, confirmPassword } = req.body;
        //Validate
        if (!email || !email.includes('@')) {
            res.status(422).json({ message: "Invalid Data" });
            return;
        }
        if (!passwordRegExp.test(password)){
            res.status(422).json({message: "must be atleast 8 char combination of A-Z, a-z, 0-9"});
            return;
        }
        // if (!password || password.length < 8 || password.search(/[a-z]/) < 0 || password.search(/[A-Z]/) < 0 || password.search(/[0-9]/) < 0) {
        //     res.status(422).json({message: "must be atleast 8 char combination of A-Z, a-z, 0-9 and "});
        //     return;
        // }
        if (password !== confirmPassword) {
            res.status(422).json({message: "password and confirm password must match"});
            return;
        }
        //Connect with database
        const client = new MongoClient(MONGODB_URI, {},) 

        try {
            await client.connect();
        } catch (e) {
            console.error(e);
        }
        
        const db = client.db();
        //Check existing
        const userExist = await db.collection('users').findOne(
            {
                $or: [
                    { email: email }, { username: username }
                ]
            }
        )

        //Send error response if duplicate user is found
        if (userExist) {
            res.status(422).json({ message: 'User already exists' });
            client.close();
            return;
        }
        
        //Hash password and create new user
        const user = await db.collection('users').insertOne({ 
            // id: cuid(),
            name,
            username,
            email,
            image: "",
            isAdmin: false,
            isActive: false,
            password: bcrypt.hashSync(password, 12),
            createdAt: createdAt,
            
        });
        
        if (!user) {
            res.status(500).json({
              statusText: "Unable to create user account",
            })
            return;
          }
        const userId = user.insertedId
        console.log("userId is : ", userId)
        const account = await db.collection('accounts').insertOne({ 
            userId: userId,
            type: "credentials",
            provider: "credentials",
            providerAccountId: userId,
            });
            // console.log(account)

        //Send success response
        if (user && account) {
            res.status(200).json({message: 'User created', ...user,});
          } else {
            res.status(500).json({
              statusText: "Unable to link account to created user profile",
            })
          }
          //Close DB connection
          client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;