const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required : true
    },

    email: {
        type: String,
        required: true,
        unique:true,
    },

    password: {
        type: String,
        required: true,
    },

    profileImage: {
        type: String,
        required : true,
    },
    
    role: {
        type: String,
        enum: ["user", "admin"],
        default : "user"
    },

    refreshToken: {
        type: String,
    },

}, { timeStamps: true })

const User = mongoose.model("user", userSchema);

module.exports = User;
