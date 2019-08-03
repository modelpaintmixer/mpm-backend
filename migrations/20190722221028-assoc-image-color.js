"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Images", "colorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Colors",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Images", "colorId")
  },
}
