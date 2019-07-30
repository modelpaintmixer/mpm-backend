"use strict"

module.exports = {
  up: queryInterface => {
    return queryInterface
      .addIndex("PaintsAttributes", {
        fields: ["paintId"],
        name: "paints_attributes_paint",
      })
      .then(() => {
        return queryInterface.addIndex("PaintsAttributes", {
          fields: ["attributeId"],
          name: "paints_attributes_attribute",
        })
      })
  },

  down: queryInterface => {
    return queryInterface
      .removeIndex("PaintsAttributes", "paints_attributes_paint")
      .then(() => {
        return queryInterface.removeIndex(
          "PaintsAttributes",
          "paints_attributes_attribute"
        )
      })
  },
}
