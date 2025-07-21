const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const DeliveryOption = require('../models/DeliveryOption');
 
// place user order using serverside cart data
const placeOrder = async (req, res) => {
  const userId = req.user._id;

  const cartItems = await Cart.find({ userId });

  if (cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  let totalAmount = 0;

  const items = await Promise.all(
    cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      const deliveryOption = await DeliveryOption.findOne({ id: String(item.deliveryOptionId) });

      const itemTotal = item.quantity * product.priceRupees + deliveryOption.priceRupees;
      totalAmount += itemTotal;

      return {
        productId: product._id,
        quantity: item.quantity,
        deliveryOptionId: item.deliveryOptionId,
        price: product.priceRupees,
        estimatedDeliveryTime: Date.now() + deliveryOption.deliveryDays * 24 * 60 * 60 * 1000
      };
    })
  );

  const newOrder = await Order.create({
    userId,
    items,
    totalAmount
  });

  // Clear user's cart after ordering
  await Cart.deleteMany({ userId });

  res.status(201).json({
    message: 'Order placed successfully',
    order: newOrder
  });
};

// get orders from serverside
const getMyOrders = async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ userId })
  .populate('items.productId', 'name image')
  .sort({ orderedAt: -1 });
  res.status(200).json(orders);
};

// Admin: Get all orders --- optional the projecct not production ready
const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('userId', 'name email')
    .populate('items.productId', 'name image priceRupees')
    .populate('items.deliveryOptionId', 'name priceRupees deliveryDays')
    .sort({ createdAt: -1 });

  res.status(200).json(orders);
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders
};
