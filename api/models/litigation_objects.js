"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Litigation_objects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Litigation_objects.hasMany(models.Litigations, {
        as: "litigations",
        onDelete: "cascade",
        foreignKey: "litigation_object_id",
      });
      models.Litigation_objects.belongsTo(models.Status, {
				as: "status",
				foreignKey: "status_id",
			});
    }
  }

  Litigation_objects.init(
    {
      label: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Litigation_objects",
    }
  );

  Litigation_objects.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Litigation_objects;
};
