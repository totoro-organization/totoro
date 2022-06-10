"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Status extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Status.hasMany(models.Admins, {
				as: "admins",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Jobs, {
				as: "jobs",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Users, {
				as: "users",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Terminals, {
				as: "terminals",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Chats, {
				as: "chats",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Litigations, {
				as: "litigations",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Partners, {
				as: "partners",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Tokens, {
				as: "discountTransactions",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Associations, {
				as: "organizations",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Pricings, {
				as: "pricings",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Subscriptions, {
				as: "subscriptions",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Discounts, {
				as: "discounts",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Groups, {
				as: "missions",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Associations_users, {
				as: "memberships",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Types_discounts, {
				as: "typesDiscounts",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Tags, {
				as: "tags",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Roles, {
				as: "roles",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Litigation_objects, {
				as: "litigation_objects",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Difficulties, {
				as: "difficulties",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Applications, {
				as: "applications",
				onDelete: "cascade",
				foreignKey: "status_id",
			});

			models.Status.hasMany(models.Appearances, {
				as: "appearances",
				onDelete: "cascade",
				foreignKey: "status_id",
			});
		}
	}

	Status.init(
		{
			label: DataTypes.STRING,
			type: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Status",
		}
	);

	Status.addHook("beforeSave", async (element) => {
		return (element.id = uuidv4());
	});

	return Status;
};
