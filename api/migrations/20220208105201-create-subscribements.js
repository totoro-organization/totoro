'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscribements', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      pricing_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          models: 'Pricings',
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
      expirate: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Subscribements');
  }
};