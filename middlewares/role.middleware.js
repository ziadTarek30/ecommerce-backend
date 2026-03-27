
exports.authorize = (...allowedRoles) =>  (req, res, next) => {
    if (allowedRoles.includes(req.user.role)) {
        next()
    } else {
        res.status(400).json({message: req.user.role + 's are not allowed to hit this route'})
    }
    
}