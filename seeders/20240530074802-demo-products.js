'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Kulkas',
        price: 1000,
        stock: 10,
        storeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'TV',
        price: 500,
        stock: 20,
        storeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'AC',
        price: 700,
        stock: 30,
        storeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lampu',
        price: 100,
        stock: 50,
        storeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mesin Cuci',
        price: 1500,
        stock: 25,
        storeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  },
};
