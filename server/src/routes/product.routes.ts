import express from 'express';

import upload from '../middleware/upload';

import { isAdmin }
from '../middleware/admin.middleware';

import { verifyToken }
from '../middleware/auth.middleware';

import {

  getProducts,

  getProductById,

  createProduct,

  updateProduct,

  deleteProduct

} from '../controllers/product.controller';

const router = express.Router();

/* =========================
   GET ALL PRODUCTS
========================= */

router.get(
  '/',
  verifyToken,
  getProducts
);

/* =========================
   GET SINGLE PRODUCT
========================= */

router.get(
  '/:id',
  verifyToken,
  getProductById
);

/* =========================
   CREATE PRODUCT
   ADMIN ONLY
========================= */

router.post(
  '/',
  upload.single('image'),
  createProduct
);

/* =========================
   UPDATE PRODUCT
   ADMIN ONLY
========================= */

router.put(
  '/:id',
  verifyToken,
  isAdmin,
  upload.single('image'),
  updateProduct
);

/* =========================
   DELETE PRODUCT
   ADMIN ONLY
========================= */

router.delete(
  '/:id',
  verifyToken,
  isAdmin,
  deleteProduct
);

export default router;