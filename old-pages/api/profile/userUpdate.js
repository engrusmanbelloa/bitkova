import { IncomingForm } from "formidable"
import { getToken } from "next-auth/jwt"
import cloudinary from "../../../config/cloudinary"
import connectDB from "../../../config/connectDB"
import { User } from "../models/UserModel"
export const config = {
    api: {
        bodyParser: false,
    },
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
        return res.status(401).json({ error: "You are not signed in", data: null })
    }
    console.log("user toke is", token)
    const id = token.sub

    if (req.method === "PUT") {
        try {
            // const result = await asyncParse(req)
            const { fields, files } = await asyncParse(req)
            const { fullname, username, phone, bio } = fields
            console.log("user form detail before conversion:", fullname, username, phone, bio)

            // image checkup
            let imagePath = ""
            let imageUrl = ""
            console.log("destructuring the image....")
            try {
                console.log("inside try block")
                if ("image" in files) {
                    // Code to check the image goes here
                    const { image } = files
                    const { filepath } = image
                    imagePath = filepath
                    // destroy the cloudinary image
                    if (token.picture.includes("cloudinary")) {
                        const publicId = token.picture.split("/").pop().split(".")[0]
                        console.log("image publicId: ", publicId)
                        cloudinary.uploader
                            .destroy(publicId, {
                                // folder: "users",
                            })
                            .then((result) => {
                                console.log("user image destroy", result)
                            })
                    } else {
                        console.log("no cloudinary imaage is available")
                    }
                    // upload the new image to the cloudinary
                    try {
                        const imgLink = await cloudinary.v2.uploader.upload(imagePath, {
                            // folder: "users",
                        })
                        imageUrl = imgLink.secure_url
                        console.log("imaage url available", imageUrl)
                    } catch (error) {
                        console.log(error)
                    }
                } else if (token.picture) {
                    // No files to check then assign token.image to imagePath
                    console.log("No image to check")
                    imageUrl = token.picture
                } else {
                    return
                }
            } catch (error) {
                console.log(error)
            }

            // Check if the authenticated user is an administrator
            // Connect to the database
            connectDB()

            // check if user already exist
            const usernameExist = await User.findOne({ username: username })
            if (usernameExist && username != token.username) {
                console.log("user with same username found............")
                return res.status(409).json({ message: "Username already exists" })
            }
            try {
                console.log("no user with same username found............")
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            image: imageUrl,
                            name: fullname,
                            username: username,
                            phone: phone,
                            bio: bio,
                            updatedAt: Date.now(),
                        },
                    },
                    { new: true },
                )
                const { password, ...user } = updatedUser._doc
                res.status(200).json({ message: "Profile updated successfully", user })
                console.log("user updated detail....", user)
            } catch (err) {
                res.status(500).json({ message: "user not updated" })
            }
        } catch (err) {
            res.status(401).json({ message: "Unauthorized" })
        }
    }
}
