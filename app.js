const express = require("express");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(express.json());


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

app.get("/", (req, res) => {
  res.send("E-Commerce Backend is running!");
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
