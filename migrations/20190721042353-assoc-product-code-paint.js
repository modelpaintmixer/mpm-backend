"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("ProductCodes", "paintId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Paints",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn("ProductCodes", "paintId")
  },
}
