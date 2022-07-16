"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Pricings", {
			id: {
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			status_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "Status",
					key: "id",
				},
			},
			label: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			price: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},
			duration: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			nb_account: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			nb_jobs_by_month: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			nb_attachments_by_publish: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			social_publish: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			flux_activities: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			certifate: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable("Pricings");
	},
};
