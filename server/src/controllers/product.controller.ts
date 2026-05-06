import { Request, Response, NextFunction } from 'express';
import path from 'path';
import pool from '../config/db';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = (req.query.search as string) || '';
    const minQty = Number(req.query.minQty || 0);
    const maxQty = Number(req.query.maxQty || 0);
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?';
    const params: Array<string | number> = [`%${search}%`, `%${search}%`];

    if (req.query.available === 'low') {
      query += ' AND quantity BETWEEN 1 AND 5';
    }
    if (req.query.available === 'out') {
      query += ' AND quantity = 0';
    }
    if (minQty) {
      query += ' AND quantity >= ?';
      params.push(minQty);
    }
    if (maxQty) {
      query += ' AND quantity <= ?';
      params.push(maxQty);
    }

    const [countRows] = await pool.execute('SELECT COUNT(*) as total FROM (' + query + ') as count_table', params);
    const total = (countRows as any)[0].total as number;

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.execute(query, params);
    const items = rows as any[];

    res.json({ items, meta: { total, page, limit } });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    const products: any[] = rows as any[];

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(products[0]);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, quantity } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, quantity, image, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, description, price, quantity, image]
    );

    res.status(201).json({ message: 'Product created successfully', productId: (result as any).insertId });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, quantity } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const existingQuery = 'SELECT * FROM products WHERE id = ?';
    const [existingRows] = await pool.execute(existingQuery, [req.params.id]);
    const existing: any[] = existingRows as any[];

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedImage = image ?? existing[0].image;
    await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, image = ? WHERE id = ?',
      [name, description, price, quantity, updatedImage, req.params.id]
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
