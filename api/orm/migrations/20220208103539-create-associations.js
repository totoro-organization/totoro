'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Associations', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      status_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Status',
          key: 'id'
        }
      },
      siren: {
        allowNull: true,
        type: Sequelize.STRING
      },
      siret: {
        allowNull: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      longitude: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      latitude: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      creation_date: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      activity: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cp: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      commune: {
        allowNull: true,
        type: Sequelize.STRING
      },
      logo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      link: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Associations');
  }
};