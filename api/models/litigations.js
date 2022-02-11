'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Litigations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Litigations.belongsTo(models.Ads, { foreignKey: 'ads_id' });
      models.Litigations.belongsTo(models.Litigation_objects, { foreignKey: 'litigation_object_id' });
      models.Litigations.belongsTo(models.Status, { foreignKey: 'status_id' });
    }
  }
  Litigations.init({
    
  }, {
    sequelize,
    modelName: 'Litigations',
  });
  Litigations.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Litigations;
};