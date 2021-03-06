"use strict"

module.exports = (sequelize, DataTypes) => {
  const Standard = sequelize.define(
    "Standard",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      abbreviation: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      notes: DataTypes.TEXT,
    },
    { timestamps: false }
  )
  Standard.associate = function(models) {
    Standard.belongsToMany(models.Period, { through: "PeriodsStandards" })
    Standard.belongsToMany(models.Color, { through: "ColorsStandards" })
    Standard.belongsToMany(models.Paint, { through: "PaintsStandards" })
    Standard.belongsTo(models.Origin)
  }

  return Standard
}
