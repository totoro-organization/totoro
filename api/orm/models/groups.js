"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Groups extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Groups.belongsTo(models.Jobs, {
				as: "job",
				foreignKey: "jobs_id",
			});
			models.Groups.belongsTo(models.Status, {
				as: "status",
				foreignKey: "status_id",
			});
			models.Groups.belongsTo(models.Users, {
				as: "participant",
				foreignKey: "user_id",
			});
			models.Groups.hasMany(models.Litigations, {
				as: "litigations",
				onDelete: "cascade",
				foreignKey: "group_id",
			});
			models.Groups.hasMany(models.Chats, {
				as: "chats",
				onDelete: "cascade",
				foreignKey: "group_id",
			});
		}
	}

	Groups.init(
		{
			qrcode: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Groups",
		}
	);

	Groups.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Groups;
};
