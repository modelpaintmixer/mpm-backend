"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface
      .addIndex("ColorsPaints", {
        fields: ["colorId"],
        name: "colors_paints_color",
      })
      .then(() => {
        return queryInterface.addIndex("ColorsPaints", {
          fields: ["paintId"],
          name: "colors_paints_paint",
        })
      })
  },

  down: queryInterface => {
    return queryInterface
      .removeIndex("ColorsPaints", "colors_paints_color")
      .then(() => {
        return queryInterface.removeIndex("ColorsPaints", "colors_paints_paint")
      })
  },
}
