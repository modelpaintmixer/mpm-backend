"use strict"

module.exports = sequelize => {
  const PaintsAttributes = sequelize.define(
    "PaintsAttributes",
    {},
    { timestamps: false }
  )

  return PaintsAttributes
}
