"use strict"

module.exports = sequelize => {
  const ColorsPeriods = sequelize.define(
    "ColorsPeriods",
    {},
    { timestamps: false }
  )

  return ColorsPeriods
}
