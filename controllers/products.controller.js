const Product = require("../models/product.model");

exports.createProduct = async (req, res, next) => {
    try {
        const {name, description, imageUrl, quantity, price, slug, category, subCategory} = req.body;
        const product = await Product.create({name, description, imageUrl, quantity, price, slug, category, subCategory})
        res.status(201).json({message: 'product created', data: product})

    }
    catch(e) {
        next(e);
    }
}
exports.getAllProducts = async (req, res, next) => {
    try {

    
    let {gender, category, sortBy, maxPrice} = req.query;
    console.log(req.query);
    let products = Product.find({deleted: false});
    if (gender) {
        // gender = (gender === 'men') ? 'male' : 'female'
        products = products.find({category: gender})
    }
    if (category)
        products = products.find({subCategory: category})
    if (sortBy) {
        if (sortBy === 'asc')
            products = products.find().sort({price:1});
        else
            products = products.find().sort({price:-1});
    }
    if (maxPrice)
        products = products.find({price: {$lte: maxPrice}});
    products = await products;
    res.status(200).json({message: 'all products', data: products});
} catch(e) {
    next(e);
}
}

exports.updateProduct = async (req, res, next) => {
    try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {returnDomument: 'after'});
    if (updatedProduct && !updatedProduct.deleted)
        res.status(200).json({message: 'updated product', data: updatedProduct});
    else
        res.status(400).json({message: 'connot find product'});
}
    catch(e) {
        next(e)
    }
}

exports.deleteProduct = async (req, res, next) => {   
    try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndUpdate(id, {deleted: true}, {returnDomument: 'after'});
    if (deletedProduct)
        res.status(200).json({message: 'deleted product', data: deletedProduct});
    else
        res.status(400).json({message: 'connot find product'});
} catch(e) {
    next(e)
}
}