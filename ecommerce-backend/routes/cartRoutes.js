// routes/cartRoutes.js

const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  getCartPaymentSummary
} = require("../controllers/cartController");

const { protect } = require("../middlewear/authMiddlewear"); // to check login

// Add item to cart
router.post("/", protect, addToCart);

// Get all cart items 
router.get("/", protect, getCartItems);

// Update quantity or delivery option 
router.put("/:productId", protect, updateCartItem);

// Remove a cart item 
router.delete("/:productId", protect, removeCartItem);

// Get payment summary
router.get("/summary", protect, getCartPaymentSummary);

module.exports = router;
