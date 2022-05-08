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
      models.Chats.belongsTo(models.Groups, {as: 'participant', foreignKey: 'group_id' });
      models.Chats.belongsTo(models.Status, {as: 'status', foreignKey: 'status_id' });
      models.Chats.belongsTo(models.Users, {as: 'recipient', foreignKey: 'recipient_id' });
      models.Chats.belongsTo(models.Users, {as: 'sender', foreignKey: 'sender_id' });
      models.Chats.hasMany(models.Attachment_chats, {as: 'attachments', foreignKey: 'chat_id' });
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