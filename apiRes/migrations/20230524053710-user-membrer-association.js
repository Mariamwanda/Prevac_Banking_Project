'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint('Users', {
      fields: ['MembrerId'],
      type: 'foreign key',
      name: 'user_membrer_association',
      references: {
        table: 'Membrers',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint('User', {
      fields: ['MembrerId'],
      type: 'foreign key',
      name: 'user_membrer_association',
      references: {
        table: 'Membrer',
        field: 'id'
      }
    });
  }
};
