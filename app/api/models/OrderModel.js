import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courses: [{productId: { type: String}}],
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

let Order = mongoose.models.courses || mongoose.model('courses', OrderSchema)
export default Order;