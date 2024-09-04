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
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
  .put(verifyToken,  upload.single('image'), async function (req, res, next) {
    if (req.file) {
      // If there's a file, upload it to Cloudinary
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.image = result.url; // Save the uploaded image URL to req.body
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }
    next();
},validateJOI(productSchema), updateProduct)
  .delete(verifyToken, deleteProduct);

export default productsRouter;