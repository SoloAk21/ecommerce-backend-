const express = require("express");
const router = express.Router();
const { User } = require("../models");

// CREATE a user
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, phone_number } = req.body;
    if (!first_name || !last_name || !phone_number) {
      return res.status(400).json({
        error: "All fields (first_name, last_name, phone_number) are required",
      });
    }
    const user = await User.create({ first_name, last_name, phone_number });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "first_name", "last_name", "phone_number"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// READ one user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "first_name", "last_name", "phone_number"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// UPDATE a user
router.put("/:id", async (req, res) => {
  try {
    const { first_name, last_name, phone_number } = req.body;
    if (!first_name || !last_name || !phone_number) {
      return res.status(400).json({
        error: "All fields (first_name, last_name, phone_number) are required",
      });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update({ first_name, last_name, phone_number });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
