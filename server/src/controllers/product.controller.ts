import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { getPool } from '../config/db';

const pool = getPool();

// =======================
// GET ALL PRODUCTS
// =======================
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
      success: false,
      message: 'Error fetching products'
    });

  }

};

// =======================
// GET PRODUCT BY ID
// =======================
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
      success: false,
      message: 'Error fetching product'
    });

  }

};

// =======================
// CREATE PRODUCT
// =======================
export const createProduct = async (
  req: any,
  res: any
) => {

  try {

    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const {
      name,
      description,
      category,
      price,
      quantity
    } = req.body;

    const image = req.file
      ? req.file.filename
      : 'no-image.png';

    // VALIDATION
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !quantity
    ) {

      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });

    }

    const query = `
      INSERT INTO products (
        name,
        description,
        category,
        price,
        quantity,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      description,
      category,
      price,
      quantity,
      image
    ];

    const [result]: any = await pool.query(
      query,
      values
    );

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      productId: result.insertId
    });

  } catch (error: any) {

    console.error(
      'CREATE PRODUCT ERROR:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });

  }

};

// =======================
// UPDATE PRODUCT
// =======================
export const updateProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      description,
      category,
      price,
      quantity
    } = req.body;

    const [rows]: any = await pool.query(
      'SELECT image FROM products WHERE id = ?',
      [req.params.id]
    );

    const existingProduct = rows[0] || {};

    let image = existingProduct.image || null;

    // HANDLE NEW IMAGE
    if (req.file) {

      image = req.file.filename;

      // DELETE OLD IMAGE
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

    // UPDATE PRODUCT
    await pool.query(
      `
      UPDATE products
      SET
        name = ?,
        description = ?,
        category = ?,
        price = ?,
        quantity = ?,
        image = ?
      WHERE id = ?
      `,
      [
        name,
        description,
        category,
        price,
        quantity,
        image,
        req.params.id
      ]
    );

    return res.json({
      success: true,
      message: 'Product updated successfully'
    });

  } catch (err: any) {

    console.log('UPDATE PRODUCT ERROR:', err);

    return res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: err.message
    });

  }

};

// =======================
// DELETE PRODUCT
// =======================
export const deleteProduct = async (
  req: Request,
  res: Response
) => {

  try {

    // GET PRODUCT IMAGE
    const [rows]: any = await pool.query(
      'SELECT image FROM products WHERE id = ?',
      [req.params.id]
    );

    const product = rows[0];

    // DELETE IMAGE FILE
    if (product?.image) {

      const imagePath = path.join(
        process.cwd(),
        'uploads',
        product.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

    }

    // DELETE PRODUCT
    await pool.query(
      'DELETE FROM products WHERE id = ?',
      [req.params.id]
    );

    return res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (err: any) {

    console.log('DELETE PRODUCT ERROR:', err);

    return res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: err.message
    });

  }

};