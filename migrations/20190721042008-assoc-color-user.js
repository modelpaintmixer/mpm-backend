"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Colors", "userId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      .then(() => {
        queryInterface.changeColumn("Colors", "userId", {
          type: Sequelize.INTEGER,
          allowNull: false,
        })
      })
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Colors", "userId")
  },
}
