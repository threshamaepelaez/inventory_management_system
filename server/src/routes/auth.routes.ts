import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../utils/validators';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
