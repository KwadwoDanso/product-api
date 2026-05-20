// DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connection");

// Local Environmental Variables
const PORT = process.env.PORT || 3001;

// DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get("/", (req, res) => {
    res.send("Server's up and running...");
});

// PORT
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
