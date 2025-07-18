const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  priceRupees: { 
    type: Number, 
    required: true 
  },
  rating: {
    stars: { 
      type: Number, 
      default: 2.5 
    },
    count: { 
      type: Number, 
      default: 10 
    }
  },
  mainCategory: { 
    type: String, 
    required: true 
  },
  subCategory: { 
    type: String,
    required: true
  },
  gender: { 
    type: String 
  },
  isTrending: { 
    type: Boolean, 
    default: false 
  },
  keywords: [String],
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Product", productSchema);
