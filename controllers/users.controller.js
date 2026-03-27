const User = require("../models/user.model")

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
    res.status(200).json({message: 'all users', data: users});
    } catch(e) {
        next(e);
    }
    
}

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json({message: 'user', data: user});
    }
    }catch(e) {
        next(e)
    }
    
}

