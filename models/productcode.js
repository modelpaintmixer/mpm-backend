"use strict"

module.exports = (sequelize, DataTypes) => {
  const ProductCode = sequelize.define(
    "ProductCode",
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detail: DataTypes.STRING,
    },
    { timestamps: false }
  )
  ProductCode.associate = function(models) {
    ProductCode.belongsTo(models.Paint)
  }

  return ProductCode
}
