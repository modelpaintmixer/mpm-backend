"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Periods", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      abbreviation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      notes: {
        type: Sequelize.TEXT,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("Periods")
  },
}
