"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Partners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Partners.hasMany(models.Discounts, {
        as: "discounts",
        onDelete: "cascade",
        foreignKey: "partner_id",
      });
      models.Partners.belongsTo(models.Status, {
        as: "status",
        foreignKey: "status_id",
      });
      models.Partners.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }

  Partners.init(
    {
      name: DataTypes.STRING,
      siren: DataTypes.STRING,
      siret: DataTypes.STRING,
      address: DataTypes.STRING,
      logo: DataTypes.STRING,
      banner: DataTypes.STRING,
      description: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      link: DataTypes.STRING,
      in_internet: DataTypes.BOOLEAN,
      in_store: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Partners",
    }
  );

  Partners.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Partners;
};
