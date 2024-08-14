import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: [
      "payed",
      "feet_impression",
      "3D_Druck",
      "shoe_shipped",
      "shoe_delivered",
    ],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: ObjectId,
    ref: "Product",
    required: true,
  },
});

export default model("Order", orderSchema);