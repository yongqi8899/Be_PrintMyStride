import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import upload from "../middlewares/multer.js";
import cloudinary from "../utils/cloudinary.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct
} from '../controllers/product.js';
import { productSchema } from '../joi/schemas.js';

const productsRouter = Router();

productsRouter.route('/').get(getAllProducts).post(verifyToken, upload.single('image'), function (req, res, next) {
  cloudinary.uploader.upload(req.file.path, function (error, result) {
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    } else {
      req.body.image = result.url;
      next(); 
    }
  });
}, validateJOI(productSchema), createProduct);

productsRouter
  .route('/:id')
  .get(getSingleProduct)
  .put(verifyToken,  upload.single('image'), function (req, res, next) {
  cloudinary.uploader.upload(req.file.path, function (error, result) {
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    } else {
      req.body.image = result.url;
      next(); 
    }
  });
},validateJOI(productSchema), updateProduct)
  .delete(verifyToken, deleteProduct);

export default productsRouter;