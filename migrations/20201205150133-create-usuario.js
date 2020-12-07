'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      nombre: {
          allowNull: false,
          type: Sequelize.STRING
      },
      apellido: Sequelize.STRING,
      email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
      },
      password: {
          allowNull: false,
          type: Sequelize.STRING
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};