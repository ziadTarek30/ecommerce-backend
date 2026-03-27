const mongoose = require('mongoose');
const { cartItemSchema } = require('./cart.model');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [cartItemSchema],
    status: {
        type: String,
        enum: ['pending', 'preparing', 'shipped', 'delivered', 'cancelled']
    },
    totalPrice: {
        type: Number
    },
    shipToAddress: {
        type: String
    },
    orderedAt: { 
        type: Date, 
        default: Date.now 
    },
    phone: {
        type: String
    }

}, {timestamps: true})
exports.Order = mongoose.model('Order', orderSchema);