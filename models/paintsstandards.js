"use strict"

module.exports = (sequelize, DataTypes) => {
  const PaintsStandards = sequelize.define(
    "PaintsStandards",
    {
      standardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  )

  return PaintsStandards
}
