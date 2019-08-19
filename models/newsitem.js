"use strict"

module.exports = (sequelize, DataTypes) => {
  const NewsItem = sequelize.define(
    "NewsItem",
    {
      headline: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  )

  return NewsItem
}
