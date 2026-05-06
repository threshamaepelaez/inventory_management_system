import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/product.controller';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware';

const router = Router();
const uploadDir = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.get('/', verifyToken, getProducts);
router.get('/:id', verifyToken, getProductById);
router.post('/', verifyToken, authorizeRoles('admin'), upload.single('image'), createProduct);
router.put('/:id', verifyToken, authorizeRoles('admin'), upload.single('image'), updateProduct);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteProduct);

export default router;
