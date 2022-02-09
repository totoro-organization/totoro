'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      ads_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Ads',
          key: 'id'
        }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Users',
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
      message: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Chats');
  }
};