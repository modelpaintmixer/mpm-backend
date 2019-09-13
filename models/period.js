"use strict"

module.exports = (sequelize, DataTypes) => {
  const Period = sequelize.define(
    "Period",
    {
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      abbreviation: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      fromYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
