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
  summary: Joi.string().required(),
  price: Joi.string().required(),
  isPublic: Joi.boolean().required(),
  userId: Joi.string().required(),
});

const orderProductSchema = Joi.object({
  productId: Joi.string().required(), 
  quantity: Joi.number().integer().min(1).required(), 
});

export const orderSchema = Joi.object({
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
  userId: Joi.string().required(),
  products: Joi.array().items(orderProductSchema).min(1).required(),
});

export const reviewSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  rating: Joi.string().required(),
  comment: Joi.string().required(),
  reviewDate: Joi.date().iso().optional(),
});


export const paymentSchema = Joi.object({
  orderId: Joi.string().required(), // Assuming you are linking this payment to an order
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip: Joi.string().required(),
  country: Joi.string().required(),
  cardNumber: Joi.string().required(), // Validate card number format
  expiryDate: Joi.string().pattern(/^\d{2}\/\d{2}$/).required(), // Validate MM/YY format
  cvv: Joi.string().length(3).pattern(/^[0-9]+$/).required(), // Validate 3-digit CVV
});