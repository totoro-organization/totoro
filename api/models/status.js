'use strict';
const { v4: uuidv4 } = require('uuid');
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
      models.Status.hasMany(models.Admins, {as: 'admins', foreignKey: 'status_id' });
      models.Status.hasMany(models.Ads, {as: 'jobs', foreignKey: 'status_id' });
      models.Status.hasMany(models.Users, {as: 'users', foreignKey: 'status_id' });
      models.Status.hasMany(models.Terminals, {as: 'terminals', foreignKey: 'status_id' });
      models.Status.hasMany(models.Chats, {as: 'chats', foreignKey: 'status_id' });
      models.Status.hasMany(models.Litigations, {as: 'litigations', foreignKey: 'status_id' });
      models.Status.hasMany(models.Partners, {as: 'partners', foreignKey: 'status_id' });
      models.Status.hasMany(models.Tokens, {as: 'discountTransactions', foreignKey: 'status_id' });
      models.Status.hasMany(models.Associations, {as: 'organizations', foreignKey: 'status_id' });
      models.Status.hasMany(models.Pricings, {as: 'pricings', foreignKey: 'status_id' });
      models.Status.hasMany(models.Subscriptions, {as: 'subscriptions', foreignKey: 'status_id' });
      models.Status.hasMany(models.Discounts, {as: 'discounts', foreignKey: 'status_id' });
    }
  }
  Status.init({
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  Status.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Status;
};