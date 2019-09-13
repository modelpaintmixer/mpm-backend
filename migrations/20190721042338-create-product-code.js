"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ProductCodes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      detail: {
        type: Sequelize.STRING(300),
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("ProductCodes")
  },
}
