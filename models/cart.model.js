const mongoose = require("mongoose");



const cartItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        min: 1
    },
    price: {
        type: Number,
        min: 0
    },
    name: {
        type: String
    },
    // cart: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Cart',
    //     required: true
    // }
});
const cartSchema = new mongoose.Schema({
    priceChanged: {
        type: Boolean,
        default: false
    },
    cartItems: [cartItemSchema]
});
const Cart = mongoose.model("Cart", cartSchema);
const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = {Cart, CartItem, cartItemSchema};