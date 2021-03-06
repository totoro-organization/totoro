"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Tags extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Tags.hasMany(models.Tag_jobs, {
				as: "tagsJob",
				onDelete: "cascade",
				foreignKey: "tag_id",
			});
			models.Tags.belongsTo(models.Status, {
				as: "status",
				foreignKey: "status_id",
			});
		}
	}

	Tags.init(
		{
			label: DataTypes.STRING,
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Tags",
		}
	);

	Tags.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Tags;
};
