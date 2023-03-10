import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'guest' },
  username: { type: String, default: null},
  walletAddress: { type: String, default: null},
  email: { type: String, required: true, unique: true },
  phone: { type: Number, default: null},
  bio: { type: String, default: null},
  password: {  type: String,},
  isAdmin: { type: Boolean, default: false,},
  isTutor: { type: Boolean, default: false,},
  image: { type: String, default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png' },
  emailVerified: { type: String, default: null },
  enrolledCourses: [{ type: String, default: null }],
  activeCourse: [{ type: String, default: null }],
  completedCourses: [{ type: String, default: null }],
  wishlsit: [{ type: String, default: null }],
}, 
{ timestamps: true }
)
let User = mongoose.models.users || mongoose.model('users', userSchema)

const AccountsSchema = new mongoose.Schema({
  userId: { type: String, required: true,},
  type: { type: String, required: true,},
  provider: { type: String , required: true,},
  providerAccountId: {  type: String, required: true},
  access_token: {  type: String, required: true},
  expires_at: {  type: Number, required: true},
  token_type: {type: String, required: true}
})
let Account = mongoose.models.accounts || mongoose.model('accounts', AccountsSchema)

const SessionSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true},
  sessionToken: { type: String , required: true, unique: true},
  expires: {  type: Date, required: true },
})
let Session = mongoose.models.sessions || mongoose.model('sessions', SessionSchema)

module.exports = {User, Account, Session}