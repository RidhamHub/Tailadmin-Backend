const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema({

    imageUrl: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: String,
        enum: ["In Stock", "Out of Stock"],
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })


const Product = mongoose.model("product", productSchema)

module.exports = Product;