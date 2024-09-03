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
      "ordered",
      "payed",
      "feet_impression",
      "3D_Druck",
      "shoe_shipped",
      "shoe_delivered",
    ],
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    }
  ],
});

export default model("Order", orderSchema);
