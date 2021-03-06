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
          model: 'Litigation_objects',
          key: 'id'
        }
      },
      group_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Groups',
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
      type: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      message: {
        allowNull: true,
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
    await queryInterface.dropTable('Litigations');
  }
};