"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Applications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Applications.hasMany(models.Appearances, {
        as: "appearances",
        onDelete: "cascade",
        foreignKey: "app_id",
      });
    }
  }

  Applications.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Applications",
    }
  );

  Applications.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Applications;
};
