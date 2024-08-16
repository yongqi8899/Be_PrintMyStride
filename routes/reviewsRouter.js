import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview
} from '../controllers/review.js';
import { reviewSchema } from '../joi/schemas.js';

const reviewsRouter = Router();

reviewsRouter.route('/').get(getAllReviews).post(verifyToken, validateJOI(reviewSchema), createReview);

reviewsRouter
  .route('/:id')
  .get(getSingleReview)
  .put(verifyToken, validateJOI(reviewSchema), updateReview)
  .delete(verifyToken, deleteReview);

export default reviewsRouter;