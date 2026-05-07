import express from 'express';

import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

import upload from '../middleware/upload';

const router = express.Router();

/* =========================
   GET ALL PRODUCTS
========================= */

router.get(
  '/',
  getProducts
);

/* =========================
   GET PRODUCT BY ID
========================= */

router.get(
  '/:id',
  getProductById
);

/* =========================
   CREATE PRODUCT
========================= */

router.post(
  '/',
  upload.single('image'),
  createProduct
);

/* =========================
   UPDATE PRODUCT
========================= */

router.put(
  '/:id',
  upload.single('image'),
  updateProduct
);

/* =========================
   DELETE PRODUCT
========================= */

router.delete(
  '/:id',
  deleteProduct
);

/* =========================
   EXPORT ROUTER
========================= */

export default router;