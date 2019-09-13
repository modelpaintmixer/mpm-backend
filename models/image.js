"use strict"

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: DataTypes.TEXT,
      path: {
        type: DataTypes.STRING(1024),
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
        type: DataTypes.STRING(6),
        allowNull: false,
      },
    },
    {}
  )
  Image.associate = function(models) {
    Image.belongsTo(models.User)
  }

  return Image
}
