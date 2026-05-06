import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  next();
};

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, quantity } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Product name is required and must be a non-empty string' });
  }

  if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) {
    return res.status(400).json({ message: 'Product price is required and must be a non-negative number' });
  }

  if (quantity === undefined || quantity === null || isNaN(Number(quantity)) || Number(quantity) < 0) {
    return res.status(400).json({ message: 'Product quantity is required and must be a non-negative integer' });
  }

  next();
};
