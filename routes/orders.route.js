const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { createOrder, getOrderByUserId } = require("../controllers/order.controller");

const route = express.Router();

route.post("/", authenticate, createOrder);
route.get('/:id', authenticate, getOrderByUserId);
module.exports = route;