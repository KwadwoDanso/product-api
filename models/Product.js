// DEPENDENCIES
const mongoose = require("mongoose");

// SCHEMA
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0.01, "Price must be greater than 0"] },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

// MODEL
const Product = mongoose.model("Product", productSchema);
module.exports = Product;