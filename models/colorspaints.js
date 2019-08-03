"use strict"

module.exports = (sequelize, DataTypes) => {
  const ColorsPaints = sequelize.define(
    "ColorsPaints",
    {
      parts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  )

  return ColorsPaints
}
