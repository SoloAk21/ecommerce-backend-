// routes/products.js
const express = require("express");
const router = express.Router();
const { Product, ProductImage, Category } = require("../models");

// CREATE a product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all products (include associated images and category)
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: ProductImage, attributes: ["id", "image"] },
        { model: Category, attributes: ["id", "name"] },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one product by ID (include associated images and category)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: ProductImage, attributes: ["id", "image"] },
        { model: Category, attributes: ["id", "name"] },
      ],
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a product image (linked to a product)
router.post("/:id/images", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    const image = await ProductImage.create({
      ...req.body,
      product_id: req.params.id,
    });
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
