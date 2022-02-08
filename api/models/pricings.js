'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pricings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Pricings.hasMany(models.Subscribements, { foreignKey: 'pricing_id' });
    }
  }
  Pricings.init({
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pricings',
  });
  return Pricings;
};