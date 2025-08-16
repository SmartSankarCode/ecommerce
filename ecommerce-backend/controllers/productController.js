const Product = require("../models/Product");

// Get all products (supports filtering)
const getAllProducts = async (req, res) => {
  const {
    mainCategory,
    subCategory,
    gender,
    isTrending,
    keyword,
    recommendationsFor,
  } = req.query;

  let query = {};
  // toLowerCase best practice
  if (mainCategory) query.mainCategory = mainCategory.toLowerCase();
  if (subCategory) query.subCategory = subCategory.toLowerCase(); // may use or not
  if (gender) query.gender = gender.toLowerCase();
  if (isTrending === "true") query.isTrending = true;

  if (keyword) {
    const keywordsArray = keyword.toLowerCase().split(' ');
    query.keywords = { $all: keywordsArray };
  }

  if (recommendationsFor) {
    const baseProduct = await Product.findById(recommendationsFor);
    if (baseProduct) {
      query.mainCategory = baseProduct.mainCategory;
      query.subCategory = baseProduct.subCategory;
      query.gender = baseProduct.gender; 
      query._id = { $ne: baseProduct._id }; // Exclude the base product itself
    }
  }

  const products = await Product.find(query);
  res.status(200).json(products);
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
};

// Since am not making project for production.
// So, i dont want to Create, Update, delete APIs for products.
// If production ready we can create.

module.exports = {
  getAllProducts,
  getProductById,
};
