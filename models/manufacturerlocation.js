"use strict"

module.exports = (sequelize, DataTypes) => {
  const ManufacturerLocation = sequelize.define(
    "ManufacturerLocation",
    {
      isMain: DataTypes.BOOLEAN,
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street2: DataTypes.STRING,
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  )
  ManufacturerLocation.associate = function(models) {
    ManufacturerLocation.belongsTo(models.Manufacturer)
  }

  return ManufacturerLocation
}
