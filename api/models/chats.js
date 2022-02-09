'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Chats.belongsTo(models.Ads, { foreignKey: 'ads_id' });
      models.Chats.belongsTo(models.Users, { foreignKey: 'user_id' });
      models.Chats.belongsTo(models.Status, { foreignKey: 'status_id' });
      models.Chats.hasMany(models.Attachment_chats, { foreignKey: 'chat_id' });
    }
  }
  Chats.init({
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chats',
  });
  return Chats;
};