import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder
} from '../controllers/order.js';
import { orderSchema } from '../joi/schemas.js';

const ordersRouter = Router();

ordersRouter.route('/').get(getAllOrders).post(verifyToken, validateJOI(orderSchema), createOrder);

ordersRouter
  .route('/:id')
  .get(getSingleOrder)
  .put(verifyToken, validateJOI(orderSchema), updateOrder)
  .delete(verifyToken, deleteOrder);

export default ordersRouter;