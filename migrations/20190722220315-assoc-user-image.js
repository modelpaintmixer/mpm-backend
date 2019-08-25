"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "profileImageId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Images",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Users", "profileImageId")
  },
}
