"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Standards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      abbreviation: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      notes: {
        type: Sequelize.TEXT,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("Standards")
  },
}
