'use strict';
const { v4: uuidv4 } = require('uuid');
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
      models.Chats.belongsTo(models.Groups, { foreignKey: 'group_id' });
      models.Chats.belongsTo(models.Status, { foreignKey: 'status_id' });
      models.Chats.belongsTo(models.Users, { foreignKey: 'recipient' });
      models.Chats.belongsTo(models.Users, { foreignKey: 'sender' });
      models.Chats.hasMany(models.Attachment_chats, { foreignKey: 'chat_id' });
    }
  }
  Chats.init({
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chats',
  });
  Chats.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Chats;
};