import { isValidObjectId } from 'mongoose';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().populate({path: 'userId', strictPopulate: false });
  res.json(products);
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const { body, userId } = req;
  const newProduct = await (await Product.create({ ...body, user: userId })).populate({ path: 'userId', strictPopulate: false });
  res.status(201).json(newProduct);
});

export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  const product = await Product.findById(id).populate({path: 'userId', strictPopulate: false });
  if (!product) throw new ErrorResponse(`Product with id of ${id} doesn't exist`, 404);
  res.send(product);
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true }).populate({path: 'userId', strictPopulate: false });
  if (!updatedProduct) throw new ErrorResponse(`Product with id of ${id} doesn't exist`, 404);
  if (updatedProduct) res.json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  const deletedProduct = await Product.findByIdAndDelete(id).populate({path: 'userId', strictPopulate: false });
  if (!deletedProduct) throw new Error(`Product with id of ${id} doesn't exist`);
  res.json({ success: `Product with id of ${id} was deleted` });
});