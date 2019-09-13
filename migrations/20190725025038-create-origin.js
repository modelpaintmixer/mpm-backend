"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Origins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      abbreviation: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("Origins")
  },
}
