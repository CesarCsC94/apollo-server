'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  producto.init({
      nombre: { 
          allowNull: false,
          type: DataTypes.STRING,
      },
      existencia: { 
          allowNull: false,
          type: DataTypes.INTEGER,
      },
      precio: {
          allowNull: false,
          type: DataTypes.DECIMAL,
      }
  }, {
    sequelize,
    modelName: 'producto',
  });
  return producto;
};