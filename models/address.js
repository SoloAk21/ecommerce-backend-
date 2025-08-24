"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Explicitly mark id as primary key
        autoIncrement: true, // Auto-increment for unique IDs
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "Addresses",
    }
  );
  return Address;
};
