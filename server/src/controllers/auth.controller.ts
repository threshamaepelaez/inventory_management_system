import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required');
}
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

// =======================
// REGISTER USER
// =======================
export const register = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
const requestBody = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
const name = requestBody.name || req.query.name;
const email = requestBody.email || req.query.email;
const password = requestBody.password || req.query.password;

// Validate required fields
if (!name || !email || !password) {
  return res.status(400).json({
    message: 'Name, email and password are required',
  });
}

// Check if email already exists
const [existingRows] = await pool.execute(
  'SELECT id FROM users WHERE email = ?',
  [email]
);

const existingUsers = existingRows as any[];

if (existingUsers.length > 0) {
  return res.status(400).json({
    message: 'Email already registered',
  });
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Insert user
await pool.execute(
  'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())',
  [name, email, hashedPassword, 'user']
);

return res.status(201).json({
  message: 'User registered successfully',
});

} catch (error) {
next(error);
}
};

// =======================
// LOGIN USER
// =======================
export const login = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
const requestBody = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
const email = requestBody.email || req.query.email;
const password = requestBody.password || req.query.password;

// Validate fields
if (!email || !password) {
  return res.status(400).json({
    message: 'Email and password are required',
  });
}

// Find user
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE email = ?',
  [email]
);

const users = rows as any[];

if (users.length === 0) {
  return res.status(401).json({
    message: 'Invalid credentials',
  });
}

const user = users[0];

// Compare password
const validPassword = await bcrypt.compare(
  password,
  user.password
);

if (!validPassword) {
  return res.status(401).json({
    message: 'Invalid credentials',
  });
}

const token = jwt.sign(
  {
    id: user.id,
    role: user.role
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: '7d'
  }
);

res.status(200).json({
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});

} catch (error) {
next(error);
}
};
