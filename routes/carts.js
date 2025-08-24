// routes/carts.js
const express = require("express");
const router = express.Router();
const { Cart, User, Product } = require("../models");

// ADD to cart (or update quantity if exists)
router.post("/", async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.quantity < quantity)
      return res.status(400).json({ error: "Insufficient stock" });

    let cartItem = await Cart.findOne({ where: { user_id, product_id } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ user_id, product_id, quantity });
    }
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ user's cart
router.get("/user/:user_id", async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { user_id: req.params.user_id },
      include: [{ model: Product, attributes: ["id", "name", "price"] }],
    });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE cart item quantity
router.put("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem)
      return res.status(404).json({ error: "Cart item not found" });
    const product = await Product.findByPk(cartItem.product_id);
    if (req.body.quantity > product.quantity)
      return res.status(400).json({ error: "Insufficient stock" });
    await cartItem.update(req.body);
    res.json(cartItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE cart item
router.delete("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem)
      return res.status(404).json({ error: "Cart item not found" });
    await cartItem.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
