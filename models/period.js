"use strict"

module.exports = (sequelize, DataTypes) => {
  const Period = sequelize.define(
    "Period",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      notes: DataTypes.TEXT,
    },
    { timestamps: false }
  )
  Period.associate = function(models) {
    Period.belongsToMany(models.Color, { through: "ColorsPeriods" })
    Period.belongsToMany(models.Standard, { through: "PeriodsStandards" })
  }

  return Period
}
