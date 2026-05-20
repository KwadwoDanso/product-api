// DEPENDENCIES
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// INDUCES

// DELETE - DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product: ", error);
        res.status(500).json({ message: error.message });
    }
});

// UPDATE - PUT /api/products/:id
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        console.error("Error updating product: ", error);
        res.status(400).json({ message: error.message });
    }
});

// CREATE - POST /api/products
router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product: ", error);
        res.status(400).json({ message: error.message });
    }
});

// SHOW - GET /api/products/:id
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        console.error("Error fetching product: ", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;