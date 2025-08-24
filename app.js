const express = require("express");
const app = express();
const port = 3000;
const { sequelize } = require("./models"); // Import from models/index.js

app.use(express.json());

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/carts");
const categoryRoutes = require("./routes/categories");
const addressRoutes = require("./routes/addresses");
const orderItemRoutes = require("./routes/orderItems");
const productImageRoutes = require("./routes/productImages");

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/carts", cartRoutes);
app.use("/categories", categoryRoutes);
app.use("/addresses", addressRoutes);
app.use("/orderItems", orderItemRoutes);
app.use("/productImages", productImageRoutes);

app.get("/", (req, res) => {
  res.send("E-Commerce Backend is running!");
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
