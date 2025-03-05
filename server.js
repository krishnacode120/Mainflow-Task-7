const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myDatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
