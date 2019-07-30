"use strict"

module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define(
    "Attribute",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    { timestamps: false }
  )
  Attribute.associate = function(models) {
    Attribute.belongsToMany(models.Paint, { through: "PaintsAttributes" })
  }

  return Attribute
}
