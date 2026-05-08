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

const PORT = process.env.PORT || 5000;

/* =========================
   CORS
========================= */

app.use(cors({
  origin: [
    'http://localhost:4200',

    'https://inventory-management-system-qjmd.vercel.app',

    'https://inventory-management-system-navy-xi.vercel.app',

    'https://inventory-management-system-hxx9xey8i.vercel.app',

    'https://inventory-management-system-9fgy18nfa.vercel.app'
  ],

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],

  credentials: true
}));

/* =========================
   HANDLE PREFLIGHT REQUESTS
========================= */

app.options('*', cors());

/* =========================
   BODY PARSER
========================= */

app.use(express.json({
  limit: '50mb'
}));

app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));

/* =========================
   STATIC FILES
========================= */

app.use(
  '/uploads',
  express.static(
    path.join(process.cwd(), 'uploads')
  )
);

/* =========================
   LOGGER
========================= */

app.use(requestLogger);

/* =========================
   TEST ROUTE
========================= */

app.get('/api/test', (_req, res) => {

  return res.status(200).json({
    message: 'API Working Successfully'
  });

});

/* =========================
   AUTH ROUTES
========================= */

app.use(
  '/api/auth',
  authRoutes
);

/* =========================
   PRODUCT ROUTES
========================= */

app.use(
  '/api/products',
  productRoutes
);

/* =========================
   SWAGGER
========================= */

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

/* =========================
   ROOT ROUTE
========================= */

app.get('/', (_req, res) => {

  return res.send(
    'Inventory Management API Running'
  );

});

/* =========================
   ERROR HANDLER
========================= */

app.use(errorHandler);

/* =========================
   DATABASE CONNECTION
========================= */

pool.getConnection()

  .then((connection: any) => {

    console.log(
      '✅ Database Connected'
    );

    connection.release();

  })

  .catch((error: any) => {

    console.error(
      '❌ Database connection failed:',
      error
    );

  });

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

  console.log(
    `📘 Swagger docs available at /api-docs`
  );

});