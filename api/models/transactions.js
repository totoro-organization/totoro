'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Transactions.belongsTo(models.Ads, { foreignKey: 'ads_id' });
      models.Transactions.belongsTo(models.Users, { foreignKey: 'user_id' });
      models.Transactions.belongsTo(models.Payments, { foreignKey: 'payment_id' });
    }
  }
  Transactions.init({
    
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  Transactions.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Transactions;
};