import express from 'express';
import { register, login } from '../controllers/auth.controller';

const router = express.Router();

// =======================
// AUTH ROUTES
// =======================

// REGISTER USER
router.post('/register', register);

// LOGIN USER
router.post('/login', login);

export default router;