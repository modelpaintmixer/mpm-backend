"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.addIndex("Colors", {
      fields: ["name"],
      name: "color_name",
    })
  },

  down: queryInterface => {
    return queryInterface.removeIndex("Colors", "color_name")
  },
}
