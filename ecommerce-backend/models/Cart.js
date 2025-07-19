const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // we use refernce to find using Populate
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",  // we use populate to get full details in controller   
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  deliveryOptionId: {
    type: String,
    ref: "DeliveryOption",  // must match your DeliveryOption model name
    required: true,
    default: "1"
  }
});

module.exports = mongoose.model("Cart", cartSchema);
