const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.authenticate = async (req, res, next) => {
    const bearerToken = req.headers.authorization?.split(" ");
    if (bearerToken?.[0] !== 'Bearer')
        return res.status(401).json({message: 'authorization token not provided'});
    const token = bearerToken?.[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload._id);
        if (!user)
            return res.status(404).json({message: 'invalid user data'});
        req.user = user;
        next();
    }
    catch(e) {
        res.status(403).json({message: 'invalid or expired token'})
    }

}