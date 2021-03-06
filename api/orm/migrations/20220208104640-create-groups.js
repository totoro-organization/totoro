"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Groups", {
			id: {
				allowNull: false,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			status_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "Status",
					key: "id",
				},
			},
			user_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "Users",
					key: "id",
				},
			},
			jobs_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "Jobs",
					key: "id",
				},
			},
			qrcode: {
				allowNull: true,
				type: Sequelize.STRING
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
		await queryInterface.dropTable("Groups");
	},
};
