const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const DeliveryOption = require("../models/DeliveryOption");
const deliveryOptions = require("../data/deliveryOptions.json");

dotenv.config();

const seedDeliveryOptions = async () => {
  await connectDB();

  await DeliveryOption.deleteMany();
  await DeliveryOption.insertMany(deliveryOptions);

  console.log("Delivery options seeded successfully!");
  process.exit(0);
};

seedDeliveryOptions();
