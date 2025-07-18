const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const products = require("../data/products.json");

dotenv.config();

const seedProducts = async () => {
  await connectDB();

  await Product.deleteMany();
  await Product.insertMany(products);

  console.log("Product data seeded successfully!");
  process.exit(0);
};

seedProducts();
