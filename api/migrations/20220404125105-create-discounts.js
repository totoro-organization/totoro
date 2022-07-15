'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discounts', {
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
          model: 'Status',
          key: 'id'
        }
      },
      type_disc_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Types_discounts',
          key: 'id'
        }
      },
      partner_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: 'Partners',
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      condition: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      cost: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      duration: {
        allowNull: true,
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
    await queryInterface.dropTable('Discounts');
  }
};