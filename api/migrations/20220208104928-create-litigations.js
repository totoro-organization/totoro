'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Litigations', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      litigation_object_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          models: 'Litigation_objects',
          key: 'id'
        }
      },
      ads_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          models: 'Ads',
          key: 'id'
        }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          models: 'Users',
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
    await queryInterface.dropTable('Litigations');
  }
};