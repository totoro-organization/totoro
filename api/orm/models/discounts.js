"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Discounts.belongsTo(models.Types_discounts, {
        as: "type",
        foreignKey: "type_disc_id",
      });
      models.Discounts.belongsTo(models.Partners, {
        as: "partner",
        foreignKey: "partner_id",
      });
      models.Discounts.belongsTo(models.Status, {
        as: "status",
        foreignKey: "status_id",
      });

      models.Discounts.hasMany(models.Tokens, {
        as: "discountTransactions",
        onDelete: "cascade",
        foreignKey: "discount_id",
      });
    }
  }

  Discounts.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      condition: DataTypes.TEXT,
      cost: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Discounts",
    }
  );

  Discounts.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Discounts;
};
