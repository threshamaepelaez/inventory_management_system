# Inventory Management System

A modern full-stack Inventory Management System built using Angular, Node.js, Express, MySQL, and Tailwind CSS.

This project allows administrators to manage products, inventory stock, categories, and users through a responsive dashboard interface.

---

# Live Preview

## Frontend

🔗 https://inventory-management-system-hxx9xey8i.vercel.app

## Backend API

🔗 https://inventory-management-system1-ptf7.onrender.com

---

# Features

## Authentication System

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control
* Admin and User Roles
* Protected Routes
* Forgot Password UI
* Show/Hide Password

## Dashboard

* Total Products Overview
* Low Stock Monitoring
* Category Counter
* Inventory Value Tracking
* Quick Action Cards
* Responsive Design
* Modern Tailwind CSS UI

## Product Management

### Admin Features

* Add Products
* Edit Products
* Delete Products
* Upload Product Images
* Search Products
* Low Stock Filtering

### User Features

* View Products Only
* Search Products
* Cannot Access CRUD Operations

## Backend API

* REST API with Express.js
* MySQL Database Integration
* Multer Image Upload
* Swagger API Documentation
* Request Logging
* Error Handling Middleware
* CORS Configuration

---

# Tech Stack

## Frontend

* Angular
* TypeScript
* Tailwind CSS
* RxJS

## Backend

* Node.js
* Express.js
* TypeScript
* JWT Authentication
* Multer

## Database

* MySQL
* Railway MySQL Hosting

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: Railway

---

# System Screenshots

---

## Authentication Pages

| Page | Preview |
|---|---|
| Login Page | <img src="./screenshots/login.png" width="900"/> |
| Register Page | <img src="./screenshots/register.png" width="900"/> |

---

## Admin Dashboard

| Page | Preview |
|---|---|
| Admin Dashboard Light Mode | <img src="./screenshots/admin-dashboard-light.png" width="900"/> |
| Admin Dashboard Dark Mode | <img src="./screenshots/admin-dashboard-dark.png" width="900"/> |

---

## Products Page

| Page | Preview |
|---|---|
| Products Page Light Mode | <img src="./screenshots/products-light.png" width="900"/> |
| Products Page Dark Mode | <img src="./screenshots/products-dark.png" width="900"/> |
| Low Stock Filter | <img src="./screenshots/low-stock.png" width="900"/> |

---

## Swagger API Documentation

| API Endpoint | Preview |
|---|---|
| POST `/api/auth/register` | <img src="./screenshots/swagger-register.png" width="900"/> |

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/threshamaepelaez/inventory_management_system.git
```

---

# Frontend Setup

```bash
cd client
npm install
ng serve
```

Frontend runs at:

```bash
http://localhost:4200
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs at:

```bash
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000
JWT_SECRET=your_secret_key
MYSQLHOST=your_mysql_host
MYSQLUSER=your_mysql_user
MYSQLPASSWORD=your_mysql_password
MYSQLDATABASE=your_database_name
MYSQLPORT=3306
```

---

# API Documentation

Swagger API Documentation:

```bash
http://localhost:5000/api-docs
```

---

# Project Structure

```bash
inventory_management_system/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── services/
│   ├── guards/
│   └── environments/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   └── utils/
│
├── screenshots/
│   ├── login.png
│   ├── register.png
│   ├── admin-dashboard-light.png
│   ├── admin-dashboard-dark.png
│   ├── products-light.png
│   ├── products-dark.png
│   ├── low-stock.png
│   └── swagger-register.png
│
└── README.md
```

---

# Security Features

* JWT Token Authentication
* Role-Based Authorization
* Protected API Routes
* Admin Middleware
* Secure Password Handling
* CORS Protection

---

# Recent Updates

* Added role-based access control
* Hidden CRUD operations for users
* Added image upload support
* Fixed CORS issues
* Connected Railway MySQL database
* Improved responsive dashboard design
* Added low stock monitoring
* Added protected admin routes
* Fixed back button navigation

---

# Author

## Developers

* Thresha Mae Pelaez
* Leilanie Javellana
* Jepte Solinap

GitHub:
https://github.com/threshamaepelaez

---

# License

This project is for educational and portfolio purposes.