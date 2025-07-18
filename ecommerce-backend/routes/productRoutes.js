const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

// Route to get all products (with filters)
router.get("/", getAllProducts);

// Route to get a single product by ID
router.get("/:id", getProductById);

module.exports = router;
