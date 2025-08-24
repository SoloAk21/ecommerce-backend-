// routes/addresses.js
const express = require("express");
const router = express.Router();
const { Address, User } = require("../models");

// CREATE an address
router.post("/", async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all addresses (optionally filter by user_id)
router.get("/", async (req, res) => {
  try {
    const { user_id } = req.query;
    const where = user_id ? { user_id } : {};
    const addresses = await Address.findAll({
      where,
      include: [{ model: User, attributes: ["id", "first_name", "last_name"] }],
    });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one address by ID
router.get("/:id", async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["id", "first_name", "last_name"] }],
    });
    if (!address) return res.status(404).json({ error: "Address not found" });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE an address
router.put("/:id", async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ error: "Address not found" });
    await address.update(req.body);
    res.json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE an address
router.delete("/:id", async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ error: "Address not found" });
    await address.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
