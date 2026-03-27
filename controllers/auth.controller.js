const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { createCart } = require("./cart.controller");

const createToken = (user) => {
    const {_id, name, role} = user;
    
    return jwt.sign({_id, name, role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
}

exports.createUser = (role) => async (req, res, next) => {
    try {
    const {name, phone, gender, email, password} = req.body;
    const user = await User.findOne({email});
    if (user)
        return res.status(500).json({message: 'email already exists'});
    const newUser = await User.create({name, phone, gender, email, role, password});
    const token = createToken(newUser)
    createCart(user._id);
    res.status(201).json({message: 'successful registration', data: token}); // respond with token
}catch(e) {
    next(e)
}
};

exports.login = async (req, res, next) => {
    try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(500).json({message: 'error logging in: wrong email or password'});
    }
    const correctPass = await user.isCorrectPassword(password);
    if (!correctPass) {
        return res.status(500).json({message: 'error logging in: wrong email or password'});

    }
    const token = createToken(user);
    res.status(200).json({message: 'successful login', data: token});
}catch(e) {
    next(e)
}
}