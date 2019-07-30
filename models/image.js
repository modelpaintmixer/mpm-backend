"use strict"

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sizeX: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sizeY: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dominantColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  )
  Image.associate = function(models) {
    Image.belongsTo(models.Mix)
  }

  return Image
}
