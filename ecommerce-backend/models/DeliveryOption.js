const mongoose = require("mongoose");

const deliveryOptionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  deliveryDays: {
    type: Number,
    required: true
  },
  priceRupees: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("DeliveryOption", deliveryOptionSchema);
