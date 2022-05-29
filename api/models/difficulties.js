"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Difficulties extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Difficulties.hasMany(models.Jobs, {
				as: "jobs",
				onDelete: "cascade",
				foreignKey: "difficulty_id",
			});
		}
	}

	Difficulties.init(
		{
			level: DataTypes.INTEGER,
			token: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Difficulties",
		}
	);

	Difficulties.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Difficulties;
};
