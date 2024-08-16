import { isValidObjectId } from 'mongoose';
import Review from '../models/Review.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find().populate({ path: 'user', strictPopulate: false }).populate({ path: 'product', strictPopulate: false });
  res.json(reviews);
});

export const createReview = asyncHandler(async (req, res, next) => {
  const { body, userId } = req;
  const newReview = await (await Review.create({ ...body, user: userId, product: productId })).populate({ path: 'user', strictPopulate: false }).populate({ path: 'product', strictPopulate: false });
  res.status(201).json(newReview);
});

export const getSingleReview = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  const review = await Review.findById(id).populate({ path: 'user', strictPopulate: false }).populate({ path: 'product', strictPopulate: false });
  if (!review) throw new ErrorResponse(`Review with id of ${id} doesn't exist`, 404);
  res.send(review);
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  const updatedReview = await Review.findByIdAndUpdate(id, body, { new: false }).populate({ path: 'user', strictPopulate: false }).populate({ path: 'product', strictPopulate: false });
  if (!updatedReview) throw new ErrorResponse(`Review with id of ${id} doesn't exist`, 404);
  res.json(updatedReview);
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  const deletedReview = await Review.findByIdAndDelete(id).populate({ path: 'user', strictPopulate: false }).populate({ path: 'product', strictPopulate: false });
  if (!deletedReview) throw new Error(`Review with id of ${id} doesn't exist`);
  res.json({ success: `Review with id of ${id} was deleted` });
});