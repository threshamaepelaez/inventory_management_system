import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import pool from '../config/db';

/* =========================
   IMAGE URL HELPER
========================= */

const getImageUrl = (image: string | null) => {

  if (!image) {
    return null;
  }

  return `http://localhost:5000/uploads/${image}`;

};

/* =========================
   GET ALL PRODUCTS
========================= */

export const getProducts = async (
  req: Request,
  res: Response
) => {

  try {

    const [rows]: any =
      await pool.query(
        `
        SELECT *
        FROM products
        ORDER BY created_at DESC
        `
      );

    const products = rows.map(
      (product: any) => ({

        ...product,

        image: getImageUrl(product.image)

      })
    );

    res.status(200).json({

      success: true,

      items: products,

      total: products.length,

      page: 1,

      totalPages: 1

    });

  } catch (error) {

    console.error(
      'GET PRODUCTS ERROR:',
      error
    );

    res.status(500).json({

      success: false,

      message:
        'Failed to fetch products'

    });

  }

};

/* =========================
   CREATE PRODUCT
========================= */

export const createProduct = async (
  req: any,
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

    if (
      !name ||
      !category ||
      !price ||
      !quantity
    ) {

      return res.status(400).json({

        success: false,

        message:
          'Please fill all required fields'

      });

    }

    const image =
      req.file?.filename || null;

    const [result]: any =
      await pool.query(

        `
        INSERT INTO products
        (
          name,
          description,
          category,
          price,
          quantity,
          image
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,

        [
          name,
          description || '',
          category,
          Number(price),
          Number(quantity),
          image
        ]

      );

    res.status(201).json({

      success: true,

      message:
        'Product created successfully',

      productId:
        result.insertId,

      image:
        getImageUrl(image)

    });

  } catch (error) {

    console.error(
      'CREATE PRODUCT ERROR:',
      error
    );

    res.status(500).json({

      success: false,

      message:
        'Failed to create product'

    });

  }

};

/* =========================
   GET PRODUCT BY ID
========================= */

export const getProductById = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    const [rows]: any =
      await pool.query(

        `
        SELECT *
        FROM products
        WHERE id = ?
        `,

        [id]

      );

    if (!rows.length) {

      return res.status(404).json({

        success: false,

        message:
          'Product not found'

      });

    }

    const product = {

      ...rows[0],

      image: getImageUrl(rows[0].image)

    };

    res.status(200).json({

      success: true,

      product

    });

  } catch (error) {

    console.error(
      'GET PRODUCT BY ID ERROR:',
      error
    );

    res.status(500).json({

      success: false,

      message:
        'Failed to fetch product'

    });

  }

};

/* =========================
   UPDATE PRODUCT
========================= */

export const updateProduct = async (
  req: any,
  res: Response
) => {

  try {

    const { id } = req.params;

    const {
      name,
      description,
      category,
      price,
      quantity
    } = req.body;

    const [existingRows]: any =
      await pool.query(

        `
        SELECT *
        FROM products
        WHERE id = ?
        `,

        [id]

      );

    if (!existingRows.length) {

      return res.status(404).json({

        success: false,

        message:
          'Product not found'

      });

    }

    const existingProduct =
      existingRows[0];

    let image =
      existingProduct.image;

    /* =========================
       NEW IMAGE UPLOAD
    ========================= */

    if (req.file) {

      image = req.file.filename;

      /* DELETE OLD IMAGE */

      if (existingProduct.image) {

        const oldImagePath =
          path.join(
            __dirname,
            '../../uploads',
            existingProduct.image
          );

        if (
          fs.existsSync(oldImagePath)
        ) {

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
        category = ?,
        price = ?,
        quantity = ?,
        image = ?
      WHERE id = ?
      `,

      [
        name,
        description || '',
        category,
        Number(price),
        Number(quantity),
        image,
        id
      ]

    );

    res.status(200).json({

      success: true,

      message:
        'Product updated successfully',

      image:
        getImageUrl(image)

    });

  } catch (error) {

    console.error(
      'UPDATE PRODUCT ERROR:',
      error
    );

    res.status(500).json({

      success: false,

      message:
        'Failed to update product'

    });

  }

};

/* =========================
   DELETE PRODUCT
========================= */

export const deleteProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    const [rows]: any =
      await pool.query(

        `
        SELECT image
        FROM products
        WHERE id = ?
        `,

        [id]

      );

    if (!rows.length) {

      return res.status(404).json({

        success: false,

        message:
          'Product not found'

      });

    }

    const image =
      rows[0].image;

    /* =========================
       DELETE IMAGE FILE
    ========================= */

    if (image) {

      const imagePath =
        path.join(
          __dirname,
          '../../uploads',
          image
        );

      if (
        fs.existsSync(imagePath)
      ) {

        fs.unlinkSync(imagePath);

      }

    }

    await pool.query(

      `
      DELETE FROM products
      WHERE id = ?
      `,

      [id]

    );

    res.status(200).json({

      success: true,

      message:
        'Product deleted successfully'

    });

  } catch (error) {

    console.error(
      'DELETE PRODUCT ERROR:',
      error
    );

    res.status(500).json({

      success: false,

      message:
        'Failed to delete product'

    });

  }

};