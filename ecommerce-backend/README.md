# 🛒 SmartsankarCode E-commerce Backend

This is a **Node.js + Express** backend for an e-commerce platform built with MongoDB. It provides RESTful APIs to support user authentication, product listings, cart functionality, order processing, and more.

---

## 🔧 Tech Stack

- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT Authentication** (HTTP-only Cookies)
- **Dotenv** for config
- **CORS**, **Cookie-Parser**, middleware

---

## 📁 Folder Structure
ecommerce-backend/
- ├── config/             # Database and server configuration
- ├── controllers/        # Route logic (auth, products, deliveryOptions, cart, orders, etc.)
- ├── data/               # Dummy data files (e.g., products.json)
- ├── middleware/         # Custom middleware (auth)
- ├── models/             # Mongoose schemas (User, Product, deliveryOptions, Cart, Order, etc.)
- ├── public/             # Static assets (like images)
- │   └── images/
- │       ├── Mens/
- │       ├── Womens/
- │       ├── Footwear/
- │       └── Home-Kitchen/
- ├── routes/             # API route definitions
- ├── scripts/            # DB seeding or maintenance scripts etc.
- ├── .env                # Environment variables
- ├── .gitignore          # Git ignore rules
- ├── package.json        # Project metadata and dependencies
- ├── package-lock.json   # Exact dependency versions
- └── README.md           # Project documentation


---

## 🚀 Features

### 🔐 Authentication

- **Register / Login / Logout**
- JWT stored in **HTTP-only cookies**
- Middleware for **protected routes**
- Admin protection for certain APIs

### 🛍️ Products

- Get all products
- Filter by category (e.g., `/api/products?mainCategory=Mens`)
- Product details by ID
- Product image management via local file system

### 🚚 Delivery Options

- Admin-defined delivery types 
- Custom `id`, `deliveryDays`, and `priceRupees`
- Stored separately for flexibility
- Used during cart and checkout flows

### 🛒 Cart

- Add item to cart with selected delivery option
- Update quantity and delivery type
- Remove item from cart
- Fetch all cart items with **populated product details**

### 📦 Orders

- Place order based on current cart items
- Stores product, quantity, delivery option, and calculated estimated delivery time
- Calculates total price (product price × quantity + delivery charge)
- Clears cart after order is placed
- Admin can view all orders
- Uses `.populate()` to include product and user info in order details

---

## 🔍 Why Use `.populate()` Instead of Matching on Frontend?

While building cart and order APIs, there were **two possible strategies** to show full product details:

1. **Frontend Matching**: Match product IDs from cart/order with product list already fetched on frontend.
2. **Backend `.populate()`**: Use Mongoose to fetch full related product data in backend and send complete JSON to frontend.

**We chose backend `.populate()` because:**

- Ensures always **latest and accurate product data**
- Avoids duplication of logic across frontend
- Easier to **maintain** and **debug**
- Keeps frontend lean and focused on display logic
- Professional developers use `.populate()` especially for **orders** and **history**, where accurate pricing and delivery data is important

---

## 📦 API Overview

### Auth

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and set JWT |
| POST | `/api/auth/logout` | Clear JWT cookie |
| GET  | `/api/auth/profile` | Get current user info (protected) |

---

### Products

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/products` | All products (optional: filter by `mainCategory`) |
| GET | `/api/products/:id` | Get product details by ID |

---

### Delivery Options

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/delivery-options` | List all delivery types |

---

### Cart

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/cart` | Get all cart items (with product details) |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:productId` | Update quantity/delivery option |
| DELETE | `/api/cart/:productId` | Remove item from cart |

---

### Orders

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/orders/place` | Place order from current cart |
| GET | `/api/orders/my-orders` | View all orders (user only) |
| GET | `/api/orders/admin` | View all orders (admin only) |

---

## 🔑 Environment Variables (`.env`)
PORT=3000
MONGO_URI=*************
JWT_SECRET=************


---

## 🧪 Testing APIs

Use [Postman](https://www.postman.com/) to test the APIs. Make sure to enable **cookie persistence** to maintain auth state across requests.

---

## 🛠️ Future Improvements (Optional)
- Refresh tokens for longer login sessions

- Product creation/edit/delete APIs (admin panel)

- Reviews and ratings

- Payment gateway integration

- Pagination, filtering, and sorting for products

- Inventory stock management

👨‍💻 Author
Made by SmartSankarCode — beginner full-stack developer passionate about building real-world applications.