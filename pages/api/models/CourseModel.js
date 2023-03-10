import mongoose from 'mongoose'

const coursesSchema = new mongoose.Schema({
  title: { type: String, required: true,},
  desc: { type: String, required: true,},
  duration: {hours: number, minutes: number,},
  price: {  type: number, required: true},
  onDemandVideos: [{type: String, required: true}],
  downloadableFiles: [{type: String, required: true}],
  courseDesc: { type: String, required: true},
  about: { type: String, required: true},
  whatYoullLearn: {type : Array , "default" : []},
  courseContent: {type: Array, "default" : []},
  reviews: [{
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
  image: { type: String, default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png' },
  meta: {
    votes: Number,
    favs:  Number
  }
}, 
{ timestamps: true })

let Courses = mongoose.models.courses || mongoose.model('courses', coursesSchema)
export default Courses