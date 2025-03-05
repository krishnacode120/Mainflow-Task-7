const express = require("express");
const User = require("../models/User");

const router = express.Router(); // ✅ Define the router

// 🟢 Create a new user (CREATE)
router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔵 Get all users (READ)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟠 Update a user (UPDATE)
router.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id.trim(); // ✅ Trim to remove unwanted spaces/newlines
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔴 Delete a user (DELETE)
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id.trim();
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; // ✅ Export the router
