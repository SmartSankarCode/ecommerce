# 🛒 SmartsankarCode E-commerce Frontend

This is a **React frontend** for the SmartsankarCode E-commerce platform.  
It connects with the **E-commerce Backend** to provide a complete shopping experience with authentication, product browsing, cart, checkout, orders, and tracking.

---

## 🔧 Tech Stack

- **React** – Frontend framework  
- **JavaScript (ES6)** – Logic and interactivity  
- **CSS** – Styling and layout  

---

## 📁 Folder Structure

ecommerce-frontend/
- ├── public/          # Static assets
- ├── src/
- │   ├── components/  # Reusable UI components (Header, Productslist)
- ├── pages/       # Pages (Auth, Home, Categories, ProductDetails, Checkout, Orders, Tracking)
- │   ├── App.jsx      # Main app file with routes
- │   ├── main.jsx     # React entry point
- ├── .gitignore       # Git ignore rules
- ├── .eslintrc.json   # ESLint configuration for code quality
- ├── index.html       # Main HTML entry point
- ├── package.json     # Project metadata and dependencies
- ├── vite.config.js   # Vite configuration
- └── README.md        # Project documentation


---

## 🚀 Features

### 🔐 Authentication & Profile
- **Register / Login** via backend  
- **Profile name** visible **only on Checkout page**  
- **Logout** appears when clicking the **Profile name/icon**  

### 🏠 Home Page
- Displays trending products and categories  

### 🛍️ Categories Page
- Browse products by category (Mens, Womens, Footwear, Home & Kitchen)  

### 📦 Product Details Page
- View full product information (images, price, Ratings etc.)  
- Add products to cart  

### 🛒 Cart & Checkout
- Add, update, or remove cart items  
- Select delivery options during checkout  
- Checkout page shows **Profile name and Logout option**  

### 📄 Orders Page
- View all previous orders  
- Check order progress (Pending, Shipped, Delivered)  

### 🚚 Tracking Page
- Track current order delivery status  

### 🌐 Responsive Design
- Works on desktop, tablet, and mobile  

---

## 🌐 Backend Integration

- Connects to the E-commerce Backend APIs.
- Update Axios base URL
- Example API calls:
  - /api/auth/login → Login
  - /api/products → Get products
  - /api/cart → Manage cart
  - /api/orders → Place/view orders



🔗 Frontend Pages → Backend API Mapping

| Frontend Page        | Backend API Endpoint                 | Purpose                                      |
| -------------------- | ------------------------------------ | -------------------------------------------- |
| Login / Register     | POST `/api/auth/login`               | Authenticate user                            |
|                      | POST `/api/auth/register`            | Register new user                            |
| Checkout             | GET `/api/auth/profile`              | Get current user info    |
| Home Page            | GET `/api/products?isTrending=true`  | Display trending products                    |
| Categories Page      | GET `/api/products?mainCategory=...` | Display products by category                 |
| Product Details Page | GET `/api/products/:id`              | Show single product details                  |
| Cart Page            | GET `/api/cart`                      | Fetch all cart items                         |
|                      | POST `/api/cart`                     | Add item to cart                             |
|                      | PUT `/api/cart/:productId`           | Update cart item quantity or delivery option |
|                      | DELETE `/api/cart/:productId`        | Remove item from cart                        |
| Checkout Page        | POST `/api/orders/place`             | Place an order                               |
| Orders Page          | GET `/api/orders/my-orders`          | Fetch all previous orders                    |



##  🛠️ Future Improvements (Optional)

- Add reviews and ratings on products

- Payment gateway integration

- Pagination, filtering, and sorting for product lists

- User profile management (edit info, change password)

- Better UI/UX with animations


👨‍💻 Author
Made by SmartSankarCode — beginner full-stack developer passionate about building real-world applications.