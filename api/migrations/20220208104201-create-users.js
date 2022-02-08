'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      terminal_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          models: 'Terminals',
          key: 'id'
        }
      },
      status_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          models: 'Status',
          key: 'id'
        }
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cp: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      longitude: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      latitude: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      rating: {
        allowNull: true,
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Users');
  }
};