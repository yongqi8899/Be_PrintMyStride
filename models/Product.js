import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: [true, "Title is required"] },
  image: { type: String, required: [true, "image is required"] },
  description: { type: String, required: [true, "description is required"] },
  summary: { type: String, required: [true, "summary is required"] },
  price: { type: String, required: [true, "price is required"] },
  isPublic: { type: Boolean, required: [true, "isPublic is required"] },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("Product", productSchema);
