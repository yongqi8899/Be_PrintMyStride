import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct
} from '../controllers/product.js';
import { productSchema } from '../joi/schemas.js';

const productsRouter = Router();

productsRouter.route('/').get(getAllProducts).post(verifyToken, validateJOI(productSchema), createProduct);

productsRouter
  .route('/:id')
  .get(getSingleProduct)
  .put(verifyToken, validateJOI(productSchema), updateProduct)
  .delete(verifyToken, deleteProduct);

export default productsRouter;