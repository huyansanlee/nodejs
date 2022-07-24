"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    data.map(item=>{
      item.created_at = new Date()
      item.updated_at = new Date()
    })

    await queryInterface.bulkInsert(
      "Product", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product", null, {});
  },
};



const data = [
  {
    name: "Arduino Sendor Kit V5.0",
    image: "product_10.jpg",
    stock: 13,
    price: 150,
  },
  {
    name: "Arduino sdf",
    image: "produsdfct_10.jpg",
    stock: 133,
    price: 1250,
  },
  {
    name: "1Arduino Sendor Kit V5.0",
    image: "product_10.jpg",
    stock: 133,
    price: 150,
  },
  {
    name: "2Arduino sdf",
    image: "produsdfct_10.jpg",
    stock: 23133,
    price: 11250,
  },
];
