'use strict';
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
      models.Users.hasMany(models.Ads, { foreignKey: 'user_id' });
      models.Users.hasMany(models.Favorites, { foreignKey: 'user_id' });
      models.Users.hasMany(models.Transactions, { foreignKey: 'user_id' });
      models.Users.hasMany(models.Subscribements, { foreignKey: 'user_id' });
      models.Users.hasMany(models.Chats, { foreignKey: 'user_id' });
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
    address: DataTypes.STRING,
    cp: DataTypes.INTEGER,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};