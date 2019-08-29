"use strict"

module.exports = (sequelize, DataTypes) => {
  const NewsItem = sequelize.define(
    "NewsItem",
    {
      headline: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  )
  NewsItem.associate = function(models) {
    NewsItem.belongsTo(models.User)
  }

  return NewsItem
}
