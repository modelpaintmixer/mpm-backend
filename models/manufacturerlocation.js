"use strict"

module.exports = (sequelize, DataTypes) => {
  const ManufacturerLocation = sequelize.define(
    "ManufacturerLocation",
    {
      isMain: DataTypes.BOOLEAN,
      url: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      street1: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      street2: DataTypes.STRING(100),
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(2),
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
