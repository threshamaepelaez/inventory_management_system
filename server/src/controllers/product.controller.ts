import { Request, Response } from 'express';
import pool from '../config/db';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );

    res.status(200).json({
      items: rows,
      total: rows.length,
      page: 1,
      totalPages: 1
    });
  } catch (error) {
    console.error('Get products error:', error);

    res.status(500).json({
      message: 'Failed to fetch products'
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity } = req.body;

    const image = req.file ? req.file.filename : null;

    const [result]: any = await pool.query(
      `INSERT INTO products 
      (name, description, price, quantity, image)
      VALUES (?, ?, ?, ?, ?)`,
      [name, description, price, quantity, image]
    );

    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertId
    });
  } catch (error) {
    console.error('Create product error:', error);

    res.status(500).json({
      message: 'Failed to create product'
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [rows]: any = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    const product = rows[0];

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Get product by id error:', error);

    res.status(500).json({
      message: 'Failed to fetch product'
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, description, price, quantity } = req.body;

    const image = req.file ? req.file.filename : req.body.image || null;

    await pool.query(
      `UPDATE products
      SET name = ?, description = ?, price = ?, quantity = ?, image = ?
      WHERE id = ?`,
      [name, description, price, quantity, image, id]
    );

    res.status(200).json({
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Update product error:', error);

    res.status(500).json({
      message: 'Failed to update product'
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );

    res.status(200).json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);

    res.status(500).json({
      message: 'Failed to delete product'
    });
  }
};