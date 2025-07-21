const express = require('express');
const router = express.Router();
const { 
  placeOrder, 
  getMyOrders,
  getAllOrders
} = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// User routes
router.post('/place', protect, placeOrder);
router.get('/my-orders', protect, getMyOrders);

// Admin route 
router.get('/admin', protect, isAdmin, getAllOrders);

module.exports = router;
