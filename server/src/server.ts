import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';

import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';

import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './utils/swagger';

import pool from './config/db';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

/* FIX 413 PAYLOAD TOO LARGE */
app.use(express.json({
  limit: '50mb'
}));

app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));

/* LOGGER */
app.use(requestLogger);

/* STATIC FILES */
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

/* =========================
   ROUTES
========================= */

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

/* SWAGGER */
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

/* ROOT */
app.get('/', (req, res) => {

  res.send('Inventory Management API Running');

});

/* ERROR HANDLER */
app.use(errorHandler);

/* =========================
   DATABASE CONNECTION
========================= */

pool.getConnection()
  .then((connection) => {

    console.log('✅ Database Connected');

    connection.release();

  })
  .catch((error) => {

    console.error('❌ Database connection failed:', error);

  });

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

  console.log(`🚀 Server running on http://localhost:${PORT}`);

  console.log(
    `📘 Swagger docs available at http://localhost:${PORT}/api-docs`
  );

});