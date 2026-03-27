const { Cart } = require("../models/cart.model");
const User = require("../models/user.model");


exports.storeCart = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        cart = await Cart.create({cartItems: req.body.cartItems});
    
    await User.findOneAndUpdate({_id: user._id}, {cart});
    res.status(200).json({message: 'cart created', data: cart});
    console.log(req.body)
    }catch(e) {
        next(e)
    }
    
}
exports.getCartById = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({_id: req.params.id});
    if (cart)
        res.status(200).json({message: 'cart found', data: cart})
    } catch(e) {
        next(e)
    }
    

}

// exports.addCartItem = async (req, res) => {
//     const userId = req.user._id;
//     let cart = await Cart.findOne({user: userId});
//     if (!cart) {
//         cart = await this.createCart(userId);
//     }
    
// }