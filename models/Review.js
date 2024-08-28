import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const reviewSchema = new Schema({
  rating: { type: String, required: [true, "Rating is required"] },
  comment: { type: String, required: [true, "Comment is required"] },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
});

export default model("Review", reviewSchema);