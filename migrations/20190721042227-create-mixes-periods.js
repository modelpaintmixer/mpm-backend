"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("MixesPeriods", {
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
      periodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Periods",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("MixesPeriods")
  },
}
