# Inventory Management System

A full-stack inventory management system built with Angular, Node.js, Express, MySQL, Tailwind CSS, JWT Authentication, and TypeScript.

---

# Features

- User Authentication
- JWT Login System
- Role-Based Authorization
- Product CRUD
- Image Upload
- Dashboard Analytics
- Search Products
- Responsive Design
- Swagger API Documentation

---

# Tech Stack

```

Frontend runs on:
http://localhost:4200

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:
http://localhost:5000

---

# Environment Variables

Create a `.env` file inside `/server`

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=inventory_db

JWT_SECRET=your_secret_key
```

---

# API Overview

## Authentication

| Method | Endpoint |
|---|---|
| POST | /api/auth/login |
| POST | /api/auth/register |

---

## Products

| Method | Endpoint |
|---|---|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

# Screenshots

## Login Page
(Add screenshot here)

## Dashboard
(Add screenshot here)

## Product Management
(Add screenshot here)

## Swagger Documentation
(Add screenshot here)

## API Testing (Postman)
(Add screenshot here)

---

# Deployment

## Frontend
Deployed using Vercel

## Backend
Deployed using Render / Railway

---

# Authors

- Thresha Mae Pelaez
- Leilanie Javellana
- Jepte Solinap