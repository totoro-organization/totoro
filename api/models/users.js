"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(models.Favorites, {
        as: "favorites",
        onDelete: "cascade",
        foreignKey: "user_id",
      });

      models.Users.hasMany(models.Chats, {
        as: "chatsRecipient",
        onDelete: "cascade",
        foreignKey: "recipient_id",
      });

      models.Users.hasMany(models.Chats, {
        as: "chatsSender",
        onDelete: "cascade",
        foreignKey: "sender_id",
      });

      models.Users.hasMany(models.Groups, {
        as: "jobs",
        onDelete: "cascade",
        foreignKey: "user_id",
      });

      models.Users.hasMany(models.Tokens, {
        as: "discountTransactions",
        onDelete: "cascade",
        foreignKey: "user_id",
      });

      models.Users.hasMany(models.Associations_users, {
        as: "memberships",
        onDelete: "cascade",
        foreignKey: "user_id",
      });

      models.Users.hasMany(models.Partners, {
        as: "partners",
        onDelete: "cascade",
        foreignKey: "user_id",
      });

      models.Users.belongsTo(models.Terminals, {
        as: "terminal",
        foreignKey: "terminal_id",
      });

      models.Users.belongsTo(models.Status, {
        as: "status",
        foreignKey: "status_id",
      });
    }
  }

  Users.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthday: DataTypes.DATEONLY,
      longitude: DataTypes.FLOAT,
      latitude: DataTypes.FLOAT,
      avatar: DataTypes.STRING,
      bio: DataTypes.TEXT,
      phone: DataTypes.STRING,
      total_token: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  Users.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Users;
};
