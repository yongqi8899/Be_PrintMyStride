import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getSinglePayment,
  updatePayment
} from '../controllers/payment.js';
import { paymentSchema } from '../joi/schemas.js';

const paymentsRouter = Router();

paymentsRouter.route('/').get(getAllPayments).post(verifyToken, validateJOI(paymentSchema), createPayment);

paymentsRouter
  .route('/:id')
  .get(getSinglePayment)
  .put(verifyToken, validateJOI(paymentSchema), updatePayment)
  .delete(verifyToken, deletePayment);

export default paymentsRouter;