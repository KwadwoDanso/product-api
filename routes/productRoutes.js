// DEPENDENCIES
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// INDUCES
// INDEX - GET /api/products (with filter, sort, pagination)
router.get("/", async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy, page, limit } = req.query;

        // Build filter object dynamically
        const filter = {};
        if (category) filter.category = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Build sort object
        const sort = {};
        if (sortBy === "price_asc") sort.price = 1;
        if (sortBy === "price_desc") sort.price = -1;

        // Pagination
        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10;
        const skip = (pageNum - 1) * limitNum;

        const products = await Product
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        res.json(products);
    } catch (error) {
        console.error("Error fetching products: ", error);
        res.status(500).json({ message: error.message });
    }
});
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