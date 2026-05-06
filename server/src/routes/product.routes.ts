import express from 'express';

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

import {
  verifyToken,
  authorizeRoles
} from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post(
  '/',
  verifyToken,
  authorizeRoles('admin'),
  createProduct
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  updateProduct
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  deleteProduct
);

export default router;