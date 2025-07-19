const express = require('express');
const dotenv = require('dotenv'); // require('dotenv').config()
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoutes');
const path = require("path");
const productRoutes = require('./routes/productRoutes');
const deliveryOptionRoutes = require("./routes/deliveryOptionRoutes");
const cartRoutes = require("./routes/cartRoutes");


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5000", // you can use this port in front-end or change here 
  credentials: true, // allow cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.use("/api/users", userRoutes); // auth routes
app.use("/api/products", productRoutes); // Product Routes
app.use("/api/delivery-options", deliveryOptionRoutes);
app.use("/api/cart", cartRoutes); // cart routes

/*
app.get("/", (req, res) => {
  res.send("Welcome Sankar...");
});
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
