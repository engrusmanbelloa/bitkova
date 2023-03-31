import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdfs: [{
    title: { type: String, required: true },
    link: { type: String, required: true }
  }],
  videos: [{
    title: { type: String, required: true },
    link: { type: String, required: true }
  }]
})

const coursesSchema = new mongoose.Schema({
  title: { type: String, required: true,},
  shortDesc: { type: String, required: true,},
  duration: {hours: Number, minutes: Number,},
  price: {  type: Number, required: true},
  about: { type: String, required: true},
  whatYoullLearn: {type : Array, required: true,},
  courseContent: {type: Array, required: true,},
  lessons: [lessonSchema],
  reviews: [{
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
  image: { type: String},
  meta: {
    votes: Number,
    favs:  Number
  }
}, 
{ timestamps: true })

let Courses = mongoose.models.courses || mongoose.model('courses', coursesSchema)
export default Courses