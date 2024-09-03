import { isValidObjectId } from "mongoose";
import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const { userId } = req.query;
  let orders;
  if (userId) {
    orders = await Order.find({ userId })
      .populate({ path: "userId", strictPopulate: false })
      .populate({
        path: "products",
        populate: {
          path: "productId",
        },
        strictPopulate: false,
      });
    return res.json(orders);
  }

  orders = await Order.find()
    .populate({ path: "userId", strictPopulate: false })
    .populate({
      path: "products",
      populate: {
        path: "productId",
      },
      strictPopulate: false,
    });
  res.json(orders);
});

export const createOrder = asyncHandler(async function (req, res, next) {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.status(201).json({ newOrder });
});

export const getSingleOrder = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse("Invalid id", 400);
  const order = await Order.findById(id)
    .populate({ path: "userId", strictPopulate: false })
    .populate({
      path: "products",
      populate: {
        path: "productId",
      },
      strictPopulate: false,
    });
  if (!order)
    throw new ErrorResponse(`Order with id of ${id} doesn't exist`, 404);
  res.send(order);
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse("Invalid id", 400);
  const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true })
    .populate({ path: "userId", strictPopulate: false })
    .populate({
      path: "products",
      populate: {
        path: "productId",
      },
      strictPopulate: false,
    });
  if (!updatedOrder)
    throw new ErrorResponse(`Order with id of ${id} doesn't exist`, 404);
  res.json(updatedOrder);
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse("Invalid id", 400);
  const deletedOrder = await Order.findByIdAndDelete(id)
    .populate({ path: "userId", strictPopulate: false })
    .populate({
      path: "products",
      populate: {
        path: "productId",
      },
      strictPopulate: false,
    });
  if (!deletedOrder) throw new Error(`Order with id of ${id} doesn't exist`);
  res.json({ success: `Order with id of ${id} was deleted` });
});
