const express = require("express");
const router = express.Router();
const { getAllDeliveryOptions } = require("../controllers/deliveryOptionController");

router.get("/", getAllDeliveryOptions);

module.exports = router;
