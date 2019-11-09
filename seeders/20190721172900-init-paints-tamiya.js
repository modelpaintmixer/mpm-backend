"use strict"

const date = new Date("2019-08-28T20:27:21.031Z")
const fs = require("fs")
const os = require("os")
const { hexToRgb } = require("../lib/colors")

module.exports = {
  up: queryInterface => {
    let paints = []
    let productCodes = []
    let attributes = []
    let attributesMap = {}
    let originsMap = {}
    let tamiyaId = -1
    const sequelize = queryInterface.sequelize

    return sequelize
      .query("SELECT id FROM Manufacturers WHERE name = 'Tamiya';", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(results => {
        tamiyaId = results[0].id

        return sequelize.query("SELECT id, name FROM Attributes;", {
          type: sequelize.QueryTypes.SELECT,
        })
      })
      .then(results => {
        for (let row of results) {
          attributesMap[row.name] = row.id
        }

        return sequelize.query("SELECT id, abbreviation FROM Origins;", {
          type: sequelize.QueryTypes.SELECT,
        })
      })
      .then(results => {
        for (let row of results) {
          originsMap[row.abbreviation] = row.id
        }

        let lines = fs
          .readFileSync("seed-data/Tamiya.txt", "utf8")
          .split(os.EOL)
        for (let lineRaw of lines) {
          // Skip any lines that start with "#"
          if (lineRaw === "" || lineRaw.startsWith("#")) {
            continue
          }

          // Remove trailing newline, then split on ","
          let line = lineRaw.trim().split(",")

          // Build the paint struct
          let newPaint = {}
          let hexColor = line[3]
          let rgbColor = hexToRgb(hexColor)

          newPaint["manufacturerId"] = tamiyaId
          newPaint["partNumber"] = line[1]
          newPaint["name"] = line[2]
          newPaint["colorHex"] = hexColor
          newPaint["colorRgb"] = rgbColor.join(",")
          newPaint["originId"] = line[7] ? originsMap[line[7]] : null
          newPaint["transparent"] = false
          newPaint["clear"] = false
          newPaint["createdAt"] = date
          newPaint["updatedAt"] = date

          // Make deferred entries for product codes:
          if (line[5] !== "" && line[5] !== null) {
            let newCode = {
              paintId: line[1],
              code: line[5],
              detail: "10ml bottle",
            }
            productCodes.push(newCode)
          }
          if (line[6] !== "" && line[6] !== null) {
            let newCode = {
              paintId: line[1],
              code: line[6],
              detail: "23ml bottle",
            }
            productCodes.push(newCode)
          }

          // Make deferred entries for attribute mappings
          for (let attr of line[4].split("|")) {
            if (attr === "transparent" || attr === "clear") {
              newPaint[attr] = true
            }
            let newAttr = {
              paintId: line[1],
              attributeId: attributesMap[attr],
            }
            attributes.push(newAttr)
          }

          // Save it
          paints.push(newPaint)
        }

        // Insert the paints
        return queryInterface.bulkInsert("Paints", paints, {})
      })
      .then(() => {
        // Don't care about the return val from the bulkInsert()...
        return sequelize.query(
          "SELECT id, partNumber FROM Paints WHERE manufacturerId = ?;",
          { replacements: [tamiyaId], type: sequelize.QueryTypes.SELECT }
        )
      })
      .then(results => {
        // Map the part numbers to the IDs
        let partMap = {}
        for (let row of results) {
          partMap[row.partNumber] = row.id
        }

        // Use partMap to replace the "labels" set up in the previous block
        for (let pc of productCodes) {
          pc.paintId = partMap[pc.paintId]
        }
        for (let at of attributes) {
          at.paintId = partMap[at.paintId]
        }

        // Insert product codes
        return queryInterface.bulkInsert("ProductCodes", productCodes, {})
      })
      .then(() => {
        // Don't care about the return value from that bulkInsert()...

        // Insert attribute mappings
        return queryInterface.bulkInsert("PaintsAttributes", attributes, {})
      })
  },

  down: queryInterface => {
    let tamiyaId = -1
    const sequelize = queryInterface.sequelize

    return sequelize
      .query("SELECT id FROM Manufacturers WHERE name = 'Tamiya';", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(results => {
        tamiyaId = results[0].id

        return queryInterface.bulkDelete(
          "Paints",
          { manufacturerId: tamiyaId },
          {}
        )
      })
  },
}
