// routes/orderItems.js
const express = require("express");
const router = express.Router();
const { OrderItem, Order, Product } = require("../models");

// CREATE an order item
router.post("/", async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.quantity < quantity)
      return res.status(400).json({ error: "Insufficient stock" });

    const orderItem = await OrderItem.create({
      order_id,
      product_id,
      quantity,
    });
    await Product.update(
      { quantity: product.quantity - quantity },
      { where: { id: product_id } }
    );
    res.status(201).json(orderItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all order items (optionally filter by order_id)
router.get("/", async (req, res) => {
  try {
    const { order_id } = req.query;
    const where = order_id ? { order_id } : {};
    const orderItems = await OrderItem.findAll({
      where,
      include: [
        { model: Order, attributes: ["id", "user_id"] },
        { model: Product, attributes: ["id", "name", "price"] },
      ],
    });
    res.json(orderItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one order item by ID
router.get("/:id", async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id, {
      include: [
        { model: Order, attributes: ["id", "user_id"] },
        { model: Product, attributes: ["id", "name", "price"] },
      ],
    });
    if (!orderItem)
      return res.status(404).json({ error: "Order item not found" });
    res.json(orderItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE an order item (e.g., change quantity)
router.put("/:id", async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem)
      return res.status(404).json({ error: "Order item not found" });
    const product = await Product.findByPk(orderItem.product_id);
    const quantityDiff = req.body.quantity - orderItem.quantity;
    if (quantityDiff > 0 && product.quantity < quantityDiff) {
      return res.status(400).json({ error: "Insufficient stock" });
    }
    await Product.update(
      { quantity: product.quantity - quantityDiff },
      { where: { id: orderItem.product_id } }
    );
    await orderItem.update(req.body);
    res.json(orderItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE an order item
router.delete("/:id", async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem)
      return res.status(404).json({ error: "Order item not found" });
    await orderItem.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
