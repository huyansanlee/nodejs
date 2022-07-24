"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      underscoredAll: true,
      sequelize,
      modelName: "Product",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Product;
};
