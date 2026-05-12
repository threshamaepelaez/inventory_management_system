import {
  Request,
  Response,
  NextFunction
} from 'express';

import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  role: string;
}

export const verifyToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  try {

    // Get authorization header
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });

    }

    // Check Bearer format
    if (!authHeader.startsWith('Bearer ')) {

      return res.status(401).json({
        success: false,
        message: 'Invalid token format'
      });

    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Check token existence
    if (!token) {

      return res.status(401).json({
        success: false,
        message: 'Token missing'
      });

    }

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Attach user data to request
    req.user = decoded;

    // Continue request
    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });

  }

};