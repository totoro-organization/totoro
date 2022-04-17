'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Payments.hasMany(models.Transactions, { foreignKey: 'payment_id' });
    }
  }
  Payments.init({
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payments',
  });
  Payments.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  })
  return Payments;
};