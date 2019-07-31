"use strict"

module.exports = sequelize => {
  const MixesPeriods = sequelize.define(
    "MixesPeriods",
    {},
    { timestamps: false }
  )

  return MixesPeriods
}
