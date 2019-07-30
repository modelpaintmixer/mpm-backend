"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Paints", "originId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Origins",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Paints", "originId")
  },
}
