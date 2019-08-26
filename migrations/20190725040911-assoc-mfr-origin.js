"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Manufacturers", "originId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Origins",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      .then(() => {
        queryInterface.changeColumn("Manufacturers", "originId", {
          type: Sequelize.INTEGER,
          allowNull: false,
        })
      })
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Manufacturers", "originId")
  },
}
