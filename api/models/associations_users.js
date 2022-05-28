"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize) => {
  class Associations_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Associations_users.hasMany(models.Ads, {
        as: "jobs",
        onDelete: "cascade",
        foreignKey: "assos_user_id",
      });
      models.Associations_users.belongsTo(models.Associations, {
        as: "organization",
        foreignKey: "assos_id",
      });
      models.Associations_users.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id",
      });
      models.Associations_users.belongsTo(models.Roles, {
        as: "role",
        foreignKey: "role_id",
      });
      models.Associations_users.belongsTo(models.Status, {
        as: "status",
        foreignKey: "status_id",
      });
    }
  }

  Associations_users.init(
    {},
    {
      sequelize,
      modelName: "Associations_users",
    }
  );

  Associations_users.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Associations_users;
};
