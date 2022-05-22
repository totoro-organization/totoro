"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Favorites.belongsTo(models.Ads, {
        as: "status",
        foreignKey: "ads_id",
      });
      models.Favorites.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id",
      });
      models.Favorites.belongsTo(models.Associations, {
        as: "organization",
        foreignKey: "assos_id",
      });
    }
  }

  Favorites.init(
    {},
    {
      sequelize,
      modelName: "Favorites",
    }
  );

  Favorites.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Favorites;
};
