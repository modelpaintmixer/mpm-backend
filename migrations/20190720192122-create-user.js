"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      country: Sequelize.STRING,
      state: Sequelize.STRING,
      website: Sequelize.STRING,
      occupation: Sequelize.STRING,
      interests: Sequelize.TEXT,
      lastVisit: Sequelize.DATE,
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable("Users")
  },
}
