// routes/orders.js
const express = require("express");
const router = express.Router();
const { Order, OrderItem, User, Product } = require("../models");

// CREATE an order
router.post("/", async (req, res) => {
  try {
    const { user_id, items } = req.body; // items: [{ product_id, quantity }]
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const order = await Order.create({ user_id });
    if (items && items.length > 0) {
      const orderItems = await Promise.all(
        items.map(async (item) => {
          const product = await Product.findByPk(item.product_id);
          if (!product) throw new Error(`Product ${item.product_id} not found`);
          if (product.quantity < item.quantity)
            throw new Error(
              `Insufficient stock for product ${item.product_id}`
            );
          await Product.update(
            { quantity: product.quantity - item.quantity },
            { where: { id: item.product_id } }
          );
          return { ...item, order_id: order.id };
        })
      );
      await OrderItem.bulkCreate(orderItems);
    }
    const fullOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ["id", "name", "price"] }],
        },
        { model: User, attributes: ["id", "first_name", "last_name"] },
      ],
    });
    res.status(201).json(fullOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ["id", "name", "price"] }],
        },
        { model: User, attributes: ["id", "first_name", "last_name"] },
      ],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ["id", "name", "price"] }],
        },
        { model: User, attributes: ["id", "first_name", "last_name"] },
      ],
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE an order (e.g., update order status or items)
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    await order.update(req.body);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE an order (and associated order items)
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    await OrderItem.destroy({ where: { order_id: order.id } });
    await order.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
