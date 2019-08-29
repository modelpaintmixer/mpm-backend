"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("NewsItems", [
      {
        headline: "We now have a news system",
        slug: "We now have a news system".replace(/[^\w]/g, ""),
        content: `As of Labor Day weekend, we have a simple news/events
reporting system. These will appear in the "**Newest Changes**" streams,
interspersed with other new items.`,
        userId: 1,
        createdAt: new Date("2019-08-28T20:44:09.914Z"),
        updatedAt: new Date("2019-08-28T20:44:09.914Z"),
      },
    ])
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("NewsItems", null, {})
  },
}