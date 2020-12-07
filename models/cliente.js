'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        
    }
  }
  cliente.init({
    nombre: {
          allowNull: false,
          type: DataTypes.STRING
      },
      apellido: {
          allowNull: false,
          type: DataTypes.STRING
      }, 
      empresa:{
          allowNull: false,
          type: DataTypes.STRING
      },
      email:{
          allowNull: false,
          type: DataTypes.STRING,
          unique:true
      },
      telefono: DataTypes.STRING,
      vendedor: {
          type:DataTypes.INTEGER,
          references: {
              model: 'usuario',
              key: 'idUsers'
          }
      }
  }, {
    sequelize,
    modelName: 'cliente',
  });
    
  cliente.associate = function(models) {
        // associations can be defined here
        cliente.belongsTo(models.usuario, {
            as: 'usuario',
            foreignKey: 'vendedor',
        });
    };
    
  return cliente;
};