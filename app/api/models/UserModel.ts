import { z } from "zod"

interface User {
    uid: string
    displayName?: string
    email: string
    username?: string
    phoneNumber?: string
    walletAddress?: string
    emailVerified?: boolean
    photoURL?: string
    bio?: string
    points?: number
    isAdmin?: boolean
    isTutor?: boolean
    enrolledCourses?: string[]
    activeCourse?: string[]
    completedCourses?: string[]
    ownCourses?: string[]
    wishlist: string[]
    updatedAt: Date
    createdAt: Date
}

const userSchema = z.object({
    uid: z.string(),
    displayName: z.string().optional(),
    email: z.string().email(),
    username: z.string().optional(),
    phoneNumber: z.string().optional(),
    walletAddress: z.string().optional(),
    emailVerified: z.boolean().optional(),
    photoURL: z.string().optional(),
    bio: z.string().optional(),
    points: z.number().optional(),
    isAdmin: z.boolean().optional(),
    isTutor: z.boolean().optional(),
    enrolledCourses: z.array(z.string()).optional(),
    activeCourse: z.array(z.string()).optional(),
    completedCourses: z.array(z.string()).optional(),
    ownCourses: z.array(z.string()).optional(),
    wishlist: z.array(z.string()).optional(),
    updatedAt: z.date().optional(),
    createdAt: z.date(),
})

export default userSchema
// const userSchema = new mongoose.Schema({
// walletAddress: { type: String, default: null },
// email: { type: String, required: true, unique: true },
// phone: { type: Number, default: null },
// bio: { type: String, default: null },
// points: { type: Number, default: null },
// isAdmin: { type: Boolean, default: false },
// isTutor: { type: Boolean, default: false },
// image: {
//     type: String,
//     default:
//         "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
// },
// emailVerified: { type: Boolean, default: false },
// enrolledCourses: [{ type: Array, default: [] }],
// activeCourse: [{ type: Array, default: [] }],
// completedCourses: [{ type: Array, default: [] }],
// ownCourses: [{ type: Array, default: [] }],
// wishlsit: [{ type: Array, default: [] }],
// createdAt: { type: Date, default: Date.now() },
// updatedAt: { type: Date, default: Date.now() },
// })
// let User = mongoose.models.users || mongoose.model("users", userSchema)

// const AccountsSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     type: { type: String, required: true },
//     provider: { type: String, required: true },
//     providerAccountId: { type: String, required: true },
//     access_token: { type: String, required: true },
//     expires_at: { type: Number, required: true },
//     token_type: { type: String, required: true },
// })
// let Account = mongoose.models.accounts || mongoose.model("accounts", AccountsSchema)

// const SessionSchema = new mongoose.Schema({
//     userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
//     sessionToken: { type: String, required: true, unique: true },
//     expires: { type: Date, required: true },
// })
// let Session = mongoose.models.sessions || mongoose.model("sessions", SessionSchema)

// // module.exports = {User, Account, Session}
// // export const {User, Account, Session} = {User, Account, Session}

// // Export the models
// export { User, Account, Session }
