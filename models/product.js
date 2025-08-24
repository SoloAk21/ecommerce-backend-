"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
      Product.hasMany(models.OrderItem, { foreignKey: "product_id" });
      Product.hasMany(models.Cart, { foreignKey: "product_id" });
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
    }
  );
  return Product;
};
