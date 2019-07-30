"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface
      .addIndex("MixesPaints", {
        fields: ["mixId"],
        name: "mixes_paints_mix",
      })
      .then(() => {
        return queryInterface.addIndex("MixesPaints", {
          fields: ["paintId"],
          name: "mixes_paints_paint",
        })
      })
  },

  down: queryInterface => {
    return queryInterface
      .removeIndex("MixesPaints", "mixes_paints_mix")
      .then(() => {
        return queryInterface.removeIndex("MixesPaints", "mixes_paints_paint")
      })
  },
}
