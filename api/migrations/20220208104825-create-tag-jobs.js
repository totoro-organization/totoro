"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Tag_jobs", {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			tag_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "Tags",
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
		await queryInterface.dropTable("Tag_jobs");
	},
};
