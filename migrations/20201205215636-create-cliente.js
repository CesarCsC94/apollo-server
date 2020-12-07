'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
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
      apellido: {
          allowNull: false,
          type: Sequelize.STRING
      }, 
      empresa:{
          allowNull: false,
          type: Sequelize.STRING
      },
      email:{
          allowNull: false,
          type: Sequelize.STRING,
          unique:true
      },
      
      telefono: Sequelize.STRING,
      vendedor: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'usuarios',
              //schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false
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
    await queryInterface.dropTable('clientes');
  }
};