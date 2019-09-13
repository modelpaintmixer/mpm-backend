"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Attributes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("Attributes")
  },
}
