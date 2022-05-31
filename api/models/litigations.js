"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Litigations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Litigations.belongsTo(models.Groups, {
        as: "mission",
        foreignKey: "group_id",
      });
      models.Litigations.belongsTo(models.Litigation_objects, {
        as: "litigation_object",
        foreignKey: "litigation_object_id",
      });
      models.Litigations.belongsTo(models.Status, {
        as: "status",
        foreignKey: "status_id",
      });
    }
  }

  Litigations.init(
    {
      type: DataTypes.BOOLEAN,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Litigations",
    }
  );

  Litigations.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Litigations;
};
