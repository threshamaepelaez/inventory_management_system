import express from 'express';
import upload from '../middleware/upload';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

// Add multer upload middleware for image upload
router.post(
  '/',
  upload.single('image'),
  createProduct
);

router.put('/:id', upload.single('image'), updateProduct);

router.delete('/:id', deleteProduct);

export default router;