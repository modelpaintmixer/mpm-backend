"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface.addIndex("Mixes", {
      fields: ["name"],
      name: "mix_name",
    })
  },

  down: queryInterface => {
    return queryInterface.removeIndex("Mixes", "mix_name")
  },
}
