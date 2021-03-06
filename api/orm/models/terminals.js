"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Terminals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Terminals.belongsTo(models.Status, {
        as: "status",
        foreignKey: "status_id",
      });
      models.Terminals.hasMany(models.Users, {
        as: "users",
        onDelete: "cascade",
        foreignKey: "terminal_id",
      });
    }
  }

  Terminals.init(
    {
      label: DataTypes.STRING,
      longitude: DataTypes.FLOAT,
      latitude: DataTypes.FLOAT,
      address: DataTypes.STRING,
      cp: DataTypes.INTEGER,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Terminals",
    }
  );

  Terminals.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Terminals;
};
