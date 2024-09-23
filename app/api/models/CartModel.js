import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courses: [{productId: { type: String,}}],
  },
  { timestamps: true }
);

let Cart = mongoose.models.courses || mongoose.model('cart', CartSchema)
export default Cart;