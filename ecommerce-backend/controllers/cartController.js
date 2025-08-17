const Cart = require("../models/Cart");
const DeliveryOption = require("../models/DeliveryOption");

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const existingItem = await Cart.findOne({ userId, productId });

  if (existingItem) {
    existingItem.quantity += quantity;
    // existingItem.deliveryOptionId = deliveryOptionId;
    await existingItem.save();
    return res.status(200).json(existingItem);
  }

  const newItem = await Cart.create({
    userId,
    productId,
    quantity,
    // deliveryOptionId default "1" in schema
  });

  res.status(201).json(newItem);
};

// Get user cart items with product details
const getCartItems = async (req, res) => {
  const userId = req.user._id;

  const cartItems = await Cart.find({ userId })
  .populate("productId")
  .sort({ createdAt: -1 }); // newest first

  const formattedCartItems = cartItems
  .filter(item => item.productId) // skip the not availble product after add to
  .map((item) => ({
    _id: item._id,
    userId: item.userId, // 
    productId: item.productId._id,
    quantity: item.quantity,
    deliveryOptionId: item.deliveryOptionId,
    product: {
      name: item.productId.name,
      priceRupees: item.productId.priceRupees,
      image: item.productId.image
      // Add more fields if needed
    },
  }));

  res.status(200).json(formattedCartItems);
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { quantity, deliveryOptionId } = req.body;

  const item = await Cart.findOne({ userId, productId });
 // optional
  if (!item) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  // Update fields only if provided
  if (quantity !== undefined) {
    item.quantity = quantity;
  }

  if (deliveryOptionId !== undefined) {
    item.deliveryOptionId = deliveryOptionId; // User-selected at checkout
  }
  
  // this way given by chatgpt clean and modern
  // item.quantity = quantity ?? item.quantity;
  // item.deliveryOptionId = deliveryOptionId ?? item.deliveryOptionId;
  await item.save();

  res.status(202).json(item);
};

// Remove item from cart
const removeCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const updatedCart = await Cart.findOneAndDelete({ userId, productId });
  res.status(202).json({
    message: "item removed successfully from your cart ",
    cart: updatedCart
  });
};

// cartsummary/payments summary:
const getCartPaymentSummary = async (req, res) => {
  const userId = req.user._id;

  const cartItems = await Cart.find({ userId }).populate('productId');
  const deliveryOptions = await DeliveryOption.find();

  let totalItemsPrice = 0;
  let totalShippingCost = 0;
  let cartQuantity = 0;

  cartItems.forEach(item => {

    const itemTotal = item.productId.priceRupees * item.quantity;
    totalItemsPrice += itemTotal;
    cartQuantity += item.quantity;

    const deliveryOption = deliveryOptions.find(
      option => option.id === item.deliveryOptionId
    );
    const shippingCost = deliveryOption ? deliveryOption.priceRupees : 0;
    totalShippingCost += shippingCost;
  });

  const totalBeforeDiscount = totalItemsPrice + totalShippingCost;

  const discountAmount = Math.round(totalBeforeDiscount * 0.05); // 5% discount in rupees
  const orderTotal = totalBeforeDiscount - discountAmount;

  res.status(200).json({
    cartQuantity,
    productPriceRupees: totalItemsPrice,
    shippingPriceRupees: totalShippingCost,
    discountAmount,
    orderTotal
  });
};


module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  getCartPaymentSummary
};
