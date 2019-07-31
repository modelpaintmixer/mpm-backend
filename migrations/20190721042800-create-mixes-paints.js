"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("MixesPaints", {
      mixId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Mixes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      paintId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Paints",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      parts: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("MixesPaints")
  },
}
