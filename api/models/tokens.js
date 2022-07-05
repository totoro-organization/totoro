"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Tokens.belongsTo(models.Discounts, {
        as: "discount",
        foreignKey: "discount_id",
      });
      models.Tokens.belongsTo(models.Users, {
        as: "user",
        foreignKey: "user_id",
      });
      models.Tokens.belongsTo(models.Status, {
        as: "status",
        foreignKey: "status_id",
      });
    }
  }

  Tokens.init(
    {
      qrcode: DataTypes.STRING,
      code: DataTypes.STRING,
      end_date: DataTypes.DATE,
			isExpired: {
				type: DataTypes.VIRTUAL,
				get() {
					var date = new Date();
					var data_now = moment(date).format("YYYY-MM-DD");
				  return data_now > moment(this.end_date).format("YYYY-MM-DD");
				}
			}
    },
    {
      sequelize,
      modelName: "Tokens",
    }
  );

  Tokens.addHook("beforeSave", async (element) => {
    return (element.id = uuidv4());
  });

  return Tokens;
};
