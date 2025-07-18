const DeliveryOption = require("../models/DeliveryOption");

const getAllDeliveryOptions = async (req, res) => {
  const options = await DeliveryOption.find();
  res.status(200).json(options);
};

module.exports = { getAllDeliveryOptions };
