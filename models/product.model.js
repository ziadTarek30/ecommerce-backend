const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: ['male', 'female']
    },
    subCategory: {
        type: String,
        enum: ['T-shirts', 'pants', 'shoes', 'jackets', 'accessories', 'dresses']
    },
    deleted: {
        type: Boolean,
        default: false
    }
    
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);