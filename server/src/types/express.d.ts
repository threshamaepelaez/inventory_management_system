import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
        role: string;
      };
      file?: {
        filename: string;
        originalname: string;
        mimetype: string;
        size: number;
        path: string;
      };
    }
  }
}

export {};
