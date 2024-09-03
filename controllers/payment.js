import { isValidObjectId } from "mongoose";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js"; // Import Order model if you need to reference orders
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Retrieve all payments
export const getAllPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find()
    .populate({ path: "orderId", strictPopulate: false }); // Populate orderId if needed
  res.json(payments);
});

// Create a new payment
export const createPayment = asyncHandler(async (req, res, next) => {
  const { orderId } = req.body;

  if (!isValidObjectId(orderId)) {
    throw new ErrorResponse("Invalid order ID", 400);
  }

  // Optionally, you could verify that the order exists
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ErrorResponse("Order not found", 404);
  }

  const newPayment = new Payment(req.body);
  await newPayment.save();
  res.status(201).json({ newPayment });
});

// Retrieve a single payment by ID
export const getSinglePayment = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    throw new ErrorResponse("Invalid payment ID", 400);
  }

  const payment = await Payment.findById(id)
    .populate({ path: "orderId", strictPopulate: false }); // Populate orderId if needed

  if (!payment) {
    throw new ErrorResponse(`Payment with id of ${id} doesn't exist`, 404);
  }

  res.json(payment);
});

// Update a payment
export const updatePayment = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    throw new ErrorResponse("Invalid payment ID", 400);
  }

  const updatedPayment = await Payment.findByIdAndUpdate(id, body, { new: true })
    .populate({ path: "orderId", strictPopulate: false }); // Populate orderId if needed

  if (!updatedPayment) {
    throw new ErrorResponse(`Payment with id of ${id} doesn't exist`, 404);
  }

  res.json(updatedPayment);
});

// Delete a payment
export const deletePayment = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    throw new ErrorResponse("Invalid payment ID", 400);
  }

  const deletedPayment = await Payment.findByIdAndDelete(id)
    .populate({ path: "orderId", strictPopulate: false }); // Populate orderId if needed

  if (!deletedPayment) {
    throw new ErrorResponse(`Payment with id of ${id} doesn't exist`, 404);
  }

  res.json({ success: `Payment with id of ${id} was deleted` });
});
