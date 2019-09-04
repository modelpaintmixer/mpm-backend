"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (queryInterface.sequelize.getDialect() === "sqlite") {
      return queryInterface
        .addColumn("NewsItems", "userId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        })
        .then(() => {
          queryInterface.changeColumn("NewsItems", "userId", {
            type: Sequelize.INTEGER,
            allowNull: false,
          })
        })
    } else {
      return queryInterface.addColumn("NewsItems", "userId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  },

  down: queryInterface => {
    return queryInterface.removeColumn("NewsItems", "userId")
  },
}
