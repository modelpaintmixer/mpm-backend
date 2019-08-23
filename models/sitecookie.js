"use strict"

module.exports = (sequelize, DataTypes) => {
  const SiteCookie = sequelize.define(
    "SiteCookie",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      needed: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      duration: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      inUse: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
    },
    {}
  )

  return SiteCookie
}
