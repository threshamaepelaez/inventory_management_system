# Inventory Management System

A full-stack inventory management system built with Angular, Tailwind CSS, Node.js, Express, TypeScript, MySQL, JWT authentication, role-based authorization, file uploads, and Swagger documentation.

## Project Structure

- `client/` — Angular frontend ready for Vercel
- `server/` — Express backend ready for Render
- `README.md` — Project overview and setup instructions
- `screenshots/` — Placeholder for UI documentation screenshots

## Features

- Login and registration
- JWT-based authentication
- Role-based authorization (`admin` and `user`)
- Product CRUD with image uploads
- Search, pagination, filtering
- Responsive Tailwind dashboard
- Swagger API documentation at `/api-docs`
- MySQL connection pooling

## Getting Started

### Backend

1. Open a terminal and navigate to `server`
2. Copy `.env.example` to `.env`
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Create the MySQL database and tables using `server/init.sql` or run the following SQL commands in your MySQL client:
   ```sql
   CREATE DATABASE IF NOT EXISTS inventory_db;
   USE inventory_db;
   -- paste the contents of server/init.sql
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Open a new terminal and navigate to `client`
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
4. Open `http://localhost:4200` in your browser.

## Environment Variables

Create a `.env` file in `server/` with:

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=inventory_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api-docs`

## Deployment

- Frontend: build with `npm run build`; deploy `client` to Vercel
- Backend: deploy `server` to Render and connect to Railway MySQL

## Notes

Use the `uploads/` folder for product images. The backend serves images from `/uploads`.
