import express from 'express';
import multer from 'multer';
import path from 'path';

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

/* =========================
   MULTER CONFIG
========================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* =========================
   PUBLIC ROUTES
========================= */

router.get('/', getProducts);

router.get('/:id', getProductById);

/* =========================
   PROTECTED ROUTES
========================= */

router.post(
  '/',
  verifyToken,
  upload.single('image'),
  createProduct
);

router.put(
  '/:id',
  verifyToken,
  upload.single('image'),
  updateProduct
);

router.delete(
  '/:id',
  verifyToken,
  deleteProduct
);

export default router;