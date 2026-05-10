import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getPool } from '../config/db';

const pool = getPool();

// =======================
// REGISTER USER
// =======================
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { name, email, password, role } = req.body;

    // CHECK REQUIRED FIELDS
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    // CHECK IF EMAIL EXISTS
    const [existingRows]: any = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingRows.length > 0) {
      return res.status(400).json({
        message: 'Email already registered'
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // DEFAULT ROLE
    const userRole = role || 'user';

    // INSERT USER
    const [result]: any = await pool.execute(
      `
      INSERT INTO users 
      (name, email, password, role, created_at) 
      VALUES (?, ?, ?, ?, NOW())
      `,
      [name, email, hashedPassword, userRole]
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      userId: result.insertId
    });

  } catch (error: any) {

    console.error('REGISTER ERROR:', error);

    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });

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

    const { email, password } = req.body;

    // CHECK REQUIRED FIELDS
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // FIND USER
    const [rows]: any = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    // USER NOT FOUND
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = rows[0];

    console.log('USER FOUND:', user);

    // CHECK PASSWORD
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    console.log('PASSWORD MATCH:', validPassword);

    // INVALID PASSWORD
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // CHECK JWT SECRET
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'JWT_SECRET is missing in environment variables'
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    // SUCCESS LOGIN
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error: any) {

    console.error('LOGIN ERROR:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error.message
    });

  }
};