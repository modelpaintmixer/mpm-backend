"use strict"

module.exports = (sequelize, DataTypes) => {
  const MixesPaints = sequelize.define(
    "MixesPaints",
    {
      parts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  )

  return MixesPaints
}
