"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("MixesStandards", {
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
      standardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Standards",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      standardNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("MixesStandards")
  },
}
