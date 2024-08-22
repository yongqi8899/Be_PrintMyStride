import Joi from "joi";

export const userSchema = Joi.object({
  userName: Joi.string().optional(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(12).required(),
  role: Joi.string().optional(),
});

export const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(12).required(),
});

export const productSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  isPublic: Joi.boolean().required(),
  userId: Joi.string().required(),
});

export const orderSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  orderDate: Joi.date().iso().optional(),
  status: Joi.string()
    .valid(
      "payed",
      "feet_impression",
      "3D_Druck",
      "shoe_shipped",
      "shoe_delivered"
    )
    .required(),
});

export const reviewSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  rating: Joi.string().required(),
  comment: Joi.string().required(),
  reviewDate: Joi.date().iso().optional(),
});
