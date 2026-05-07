import express from 'express';

import multer from 'multer';

import path from 'path';

import fs from 'fs';

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

import {
  verifyToken
} from '../middleware/auth.middleware';

const router = express.Router();

/* =========================
   CREATE UPLOADS FOLDER
========================= */

const uploadDir = path.join(
  __dirname,
  '..',
  'uploads'
);

fs.mkdirSync(uploadDir, {
  recursive: true
});

/* =========================
   MULTER STORAGE
========================= */

const storage = multer.diskStorage({

  destination: (
    _req,
    _file,
    cb
  ) => {

    cb(null, uploadDir);

  },

  filename: (
    _req,
    file,
    cb
  ) => {

    const ext =
      path.extname(
        file.originalname
      );

    cb(
      null,
      `${Date.now()}${ext}`
    );

  }

});

/* =========================
   MULTER CONFIG
========================= */

const upload = multer({

  storage,

  limits: {
    fileSize: 10 * 1024 * 1024
  }

});

/* =========================
   PUBLIC ROUTES
========================= */

router.get(
  '/',
  getProducts
);

router.get(
  '/:id',
  getProductById
);

/* =========================
   CREATE PRODUCT
========================= */

router.post(
  '/',
  verifyToken,
  upload.single('image'),
  createProduct
);

/* =========================
   UPDATE PRODUCT
========================= */

router.put(
  '/:id',
  verifyToken,
  upload.single('image'),
  updateProduct
);

/* =========================
   DELETE PRODUCT
========================= */

router.delete(
  '/:id',
  verifyToken,
  deleteProduct
);

export default router;