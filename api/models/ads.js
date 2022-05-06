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
      models.Ads.belongsTo(models.Status, {as: 'status',  foreignKey: 'status_id' });
      models.Ads.belongsTo(models.Associations_users, {as: 'author',  foreignKey: 'assos_user_id' });
      models.Ads.belongsTo(models.Difficulties, {as: 'difficulty',  foreignKey: 'difficulty_id' });
      models.Ads.hasMany(models.Favorites, {as: 'favorites',  foreignKey: 'ads_id' });
      models.Ads.hasMany(models.Tag_ads, {as: 'tags',  foreignKey: 'ads_id' });
      models.Ads.hasMany(models.Attachment_ads, {as: 'attachments',  foreignKey: 'ads_id' });
      models.Ads.hasMany(models.Groups, {as: 'participants',  foreignKey: 'ads_id' });

    }
  }
  Ads.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    participants_max: DataTypes.INTEGER,
    address: DataTypes.STRING,
    cp: DataTypes.INTEGER,
    commune: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ads',
  });
  Ads.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Ads;
};