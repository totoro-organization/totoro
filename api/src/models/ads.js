'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Ads.belongsTo(models.Status, { foreignKey: 'status_id' });
      models.Ads.belongsTo(models.Users, { foreignKey: 'user_id' });
      models.Ads.hasMany(models.Favorites, { foreignKey: 'ads_id' });
      models.Ads.hasMany(models.Litigations, { foreignKey: 'ads_id' });
      models.Ads.hasMany(models.Chats, { foreignKey: 'ads_id' });
      models.Ads.hasMany(models.Tag_ads, { foreignKey: 'ads_id' });
      models.Ads.hasMany(models.Transactions, { foreignKey: 'ads_id' });
      models.Ads.hasMany(models.Attachment_ads, { foreignKey: 'ads_id' });
    }
  }
  Ads.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Ads',
  });
  Ads.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Ads;
};