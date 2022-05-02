'use strict';
const { v4: uuidv4 } = require('uuid');
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
      models.Pricings.hasMany(models.Subscriptions, { foreignKey: 'pricing_id' });
    }
  }
  Pricings.init({
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    duration: DataTypes.INTEGER,
    nb_account: DataTypes.INTEGER,
    nb_ads_by_month: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pricings',
  });
  Pricings.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Pricings;
};