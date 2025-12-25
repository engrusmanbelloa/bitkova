import mongoose from "mongoose"

const postsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        image: { type: String },
        meta: {
            votes: Number,
            favs: Number,
        },
        tags: { type: Array, default: [] },
    },
    { timestamps: true },
)

let Posts = mongoose.models.posts || mongoose.model("blogs", postsSchema)
export default Posts
