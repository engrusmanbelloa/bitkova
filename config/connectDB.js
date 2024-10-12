import mongoose from "mongoose"
mongoose.set("strictQuery", false)
const connectDB = () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected.")
        return
    }

    mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
        if (err) throw err
        console.log("Connected to mongodb.")
    })
}

export default connectDB
