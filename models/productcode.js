"use strict"

module.exports = (sequelize, DataTypes) => {
  const ProductCode = sequelize.define(
    "ProductCode",
    {
      code: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      detail: DataTypes.STRING(300),
    },
    { timestamps: false }
  )
  ProductCode.associate = function(models) {
    ProductCode.belongsTo(models.Paint)
  }

  return ProductCode
}
