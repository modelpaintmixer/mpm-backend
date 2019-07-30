"use strict"

module.exports = (sequelize, DataTypes) => {
  const MixesStandards = sequelize.define(
    "MixesStandards",
    {
      standardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  )

  return MixesStandards
}
