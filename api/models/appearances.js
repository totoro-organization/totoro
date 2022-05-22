"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Appearances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Appearances.belongsTo(models.Applications, {
        as: "application",
        foreignKey: "app_id",
      });
    }
  }

  Appearances.init(
    {
      logo: DataTypes.STRING,
      icon: DataTypes.STRING,
      primary_theme: DataTypes.STRING,
      secondary_theme: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Appearances",
    }
  );

  Appearances.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Appearances;
};
