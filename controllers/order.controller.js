const { Order } = require("../models/order.model")

exports.createOrder = async (req, res, next) => {
    try {
    const order = await Order.create(req.body);
    res.json({message: 'order created', data: order});
    }catch(e) {
        next(e)
    }
    
}

exports.getOrderByUserId = async (req, res, next) => {
    try {
        const orders = await Order.find({user: req.user._id});
    res.json({message: 'orders by user', data: orders});
    console.log(orders);
    }catch(e) {
        next(e)
    }
    

}