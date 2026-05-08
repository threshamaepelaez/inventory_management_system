import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import pool from '../config/db';

export const getProducts = async (
  req: Request,
  res: Response
) => {

  try {

    const [rows] = await pool.query(
      'SELECT * FROM products'
    );

    return res.json(rows);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: 'Error fetching products'
    });

  }

};

export const getProductById = async (
  req: Request,
  res: Response
) => {

  try {

    const [rows]: any = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );

    return res.json(rows[0]);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: 'Error fetching product'
    });

  }

};

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      description,
      price,
      quantity
    } = req.body;

    // Handle image upload
    let image = null;
    if (req.file) {
      image = req.file.filename;
    }

    await pool.query(
      `
      INSERT INTO products
      (
        name,
        description,
        price,
        quantity,
        image
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        name,
        description,
        price,
        quantity,
        image
      ]
    );

    return res.json({
      message: 'Product added'
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error creating product'
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      description,
      price,
      quantity
    } = req.body;

    const [rows]: any = await pool.query(
      'SELECT image FROM products WHERE id = ?',
      [req.params.id]
    );

    const existingProduct = rows[0] || {};
    let image = existingProduct.image || null;

    if (req.file) {
      image = req.file.filename;

      if (existingProduct.image) {
        const oldImagePath = path.join(
          process.cwd(),
          'uploads',
          existingProduct.image
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    await pool.query(

      `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        quantity = ?,
        image = ?
      WHERE id = ?
      `,

      [
        name,
        description,
        price,
        quantity,
        image,
        req.params.id
      ]

    );

    return res.json({
      message: 'Product updated'
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: 'Error updating product'
    });

  }

};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {

  try {

    await pool.query(
      'DELETE FROM products WHERE id = ?',
      [req.params.id]
    );

    return res.json({
      message: 'Product deleted'
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: 'Error deleting product'
    });

  }

};