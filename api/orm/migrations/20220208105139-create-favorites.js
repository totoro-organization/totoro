"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Favorites", {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			user_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "Users",
					key: "id",
				},
			},
			assos_id: {
				allowNull: true,
				type: Sequelize.UUID,
				references: {
					model: "Associations",
					key: "id",
				},
			},
			jobs_id: {
				allowNull: true,
				type: Sequelize.UUID,
				references: {
					model: "Jobs",
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Favorites");
	},
};
