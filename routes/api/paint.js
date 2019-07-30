/*
 * Functionality for /api/paint
 */

const express = require("express")

const {
  Paint,
  Manufacturer,
  Origin,
  ProductCode,
  Sequelize,
} = require("../../models")
const { like } = Sequelize.Op

let router = express.Router()

router.get("/:id(\\d+)?", (req, res) => {
  let queryOpts = {
    include: [Manufacturer, Origin, ProductCode],
    order: ["name"],
    where: {},
  }

  if (req.params.id) {
    queryOpts.where.id = req.params.id
  }
  let query = req.query
  if (query.part_number) {
    queryOpts.where.partNumber = { [like]: `%${query.part_number}%` }
  }
  if (query.name) {
    queryOpts.where.name = { [like]: `%${query.name}%` }
  }

  Paint.findAll(queryOpts).then(results => {
    let paints = results.map(item => item.get())
    res.send({ paints: paints, timestamp: Date.now() })
  })
})

router.get("/:id/attributes", (req, res) => {
  let id = req.params.id

  Paint.findByPk(id).then(paint => {
    paint.getAttributes({ order: ["id"] }).then(results => {
      let attrs = results.map(item => {
        item = item.get()
        delete item.PaintsAttributes
        return item
      })
      res.send({ attributes: attrs, timestamp: Date.now() })
    })
  })
})

module.exports = router
