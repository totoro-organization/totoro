'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(models.Favorites, { foreignKey: 'user_id' });
      models.Users.hasMany(models.Chats, {as: 'UserRecipient', foreignKey: 'recipient' });
      models.Users.hasMany(models.Chats, {as: 'UserSender', foreignKey: 'sender' });
      models.Users.hasMany(models.Groups, { foreignKey: 'user_id' });
      models.Users.hasMany(models.Tokens, { foreignKey: 'user_id' });
      models.Users.hasMany(models.Associations_users, { foreignKey: 'user_id' });
      models.Users.belongsTo(models.Terminals, { foreignKey: 'terminal_id' });
      models.Users.belongsTo(models.Status, { foreignKey: 'status_id' });
    
    }
  }
  Users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
    phone: DataTypes.STRING,
    total_token: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.addHook("beforeSave", async (element) => {
    return element.id = uuidv4();
  } )
  return Users;
};