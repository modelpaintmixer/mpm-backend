"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Images", "mixId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Mixes",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Images", "mixId")
  },
}
