'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Status.hasMany(models.Admins, { foreignKey: 'status_id' });
      models.Status.hasMany(models.Ads, { foreignKey: 'status_id' });
      models.Status.hasMany(models.Subscribements, { foreignKey: 'status_id' });
      models.Status.hasMany(models.Users, { foreignKey: 'status_id' });
      models.Status.hasMany(models.Terminals, { foreignKey: 'status_id' });
      models.Status.hasMany(models.Chats, { foreignKey: 'status_id' });
      models.Status.hasMany(models.Litigations, { foreignKey: 'status_id' });
    }
  }
  Status.init({
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};