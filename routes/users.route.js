const express = require("express");
const { createUser } = require("../controllers/auth.controller");
const { getUsers, getUserById } = require("../controllers/users.controller");
const { storeCart, getCartById } = require("../controllers/cart.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const route = express.Router();

route.post("/", createUser('user'));
// route.post("/cart", authenticate, authorize('user'), createCart('user'));
route.get('/', getUsers);
route.get('/:id', getUserById);
route.post('/cart', authenticate, storeCart);
route.get('/cart/:id', authenticate, getCartById);

module.exports = route;