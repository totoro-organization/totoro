"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Pricings extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Pricings.hasMany(models.Subscriptions, {
				as: "subscriptions",
				onDelete: "cascade",
				foreignKey: "pricing_id",
			});
			models.Pricings.belongsTo(models.Status, {
				as: "status",
				foreignKey: "status_id",
			});
		}
	}

	Pricings.init(
		{
			label: DataTypes.STRING,
			description: DataTypes.TEXT,
			price: DataTypes.FLOAT,
			duration: DataTypes.INTEGER,
			nb_account: DataTypes.INTEGER,
			nb_jobs_by_month: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Pricings",
		}
	);

	Pricings.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Pricings;
};
