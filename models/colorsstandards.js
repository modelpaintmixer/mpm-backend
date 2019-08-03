"use strict"

module.exports = (sequelize, DataTypes) => {
  const ColorsStandards = sequelize.define(
    "ColorsStandards",
    {
      standardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  )

  return ColorsStandards
}
