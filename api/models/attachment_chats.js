'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachment_chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Attachment_chats.belongsTo(models.Chats, { foreignKey: 'chat_id' });
    }
  }
  Attachment_chats.init({
    attachment: DataTypes.STRING,
    type: DataTypes.STRING,
    original_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attachment_chats',
  });
  Attachment_chats.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Attachment_chats;
};