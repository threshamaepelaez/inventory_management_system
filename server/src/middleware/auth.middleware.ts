import {
  Request,
  Response,
  NextFunction
} from 'express';

import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });

    }

    const token =
      authHeader.split(' ')[1];

    if (!token) {

      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });

  }

};