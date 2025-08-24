// routes/productImages.js
const express = require("express");
const router = express.Router();
const { ProductImage, Product } = require("../models");

// CREATE a product image
router.post("/", async (req, res) => {
  try {
    const { product_id } = req.body;
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    const productImage = await ProductImage.create(req.body);
    res.status(201).json(productImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all product images (optionally filter by product_id)
router.get("/", async (req, res) => {
  try {
    const { product_id } = req.query;
    const where = product_id ? { product_id } : {};
    const productImages = await ProductImage.findAll({
      where,
      include: [{ model: Product, attributes: ["id", "name"] }],
    });
    res.json(productImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one product image by ID
router.get("/:id", async (req, res) => {
  try {
    const productImage = await ProductImage.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ["id", "name"] }],
    });
    if (!productImage)
      return res.status(404).json({ error: "Product image not found" });
    res.json(productImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a product image
router.put("/:id", async (req, res) => {
  try {
    const productImage = await ProductImage.findByPk(req.params.id);
    if (!productImage)
      return res.status(404).json({ error: "Product image not found" });
    await productImage.update(req.body);
    res.json(productImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a product image
router.delete("/:id", async (req, res) => {
  try {
    const productImage = await ProductImage.findByPk(req.params.id);
    if (!productImage)
      return res.status(404).json({ error: "Product image not found" });
    await productImage.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
