'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Subscribements.belongsTo(models.Pricings, { foreignKey: 'pricing_id' });
      models.Subscribements.belongsTo(models.Status, { foreignKey: 'status_id' });
      models.Subscribements.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  }
  Subscribements.init({
    expirate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Subscribements',
  });
  return Subscribements;
};