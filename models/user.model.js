const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    email: {
        type: String,
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin']
    },
    password: {
        type: String,
        minLength: 4
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
}, {timestamps: true});


const bcrypt = require("bcrypt");

userSchema.pre("save", async function(next) {
    if (!this.isModified("password"))
        return
    this.password = await bcrypt.hash(this.password, 12);
})

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model("User", userSchema);