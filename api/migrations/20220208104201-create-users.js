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
        allowNull: true,
        type: Sequelize.UUID,
        references: { 
          model: 'Terminals',
          key: 'id'
        }
      },
      status_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Status',
          key: 'id'
        }
      },
      firstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: true,
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
        allowNull: true,
        type: Sequelize.DATEONLY
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
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      total_token: {
        allowNull: false,
        type: Sequelize.INTEGER
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