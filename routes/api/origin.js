/*
 * Functionality for /api/origin
 */

const express = require("express")

const {
  Origin,
  Manufacturer,
  Color,
  Paint,
  Standard,
  Sequelize,
} = require("../../models")
const { like } = Sequelize.Op

let router = express.Router()

router.get("/:id(\\d+)?", (req, res) => {
  let queryOpts = {
    order: ["name"],
    include: [Manufacturer, Color, Paint, Standard],
    where: {},
  }

  if (req.params.id) {
    queryOpts.where.id = req.params.id
  }
  if (req.query.name) {
    queryOpts.where.name = { [like]: `%${req.query.name}%` }
  }

  Origin.findAll(queryOpts).then(results => {
    let origins = results.map(item => item.get())
    res.send({ origins: origins, timestamp: Date.now() })
  })
})

module.exports = router
