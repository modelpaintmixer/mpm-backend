/*
 * Functionality for /api/attribute
 */

const express = require("express")

const { Attribute, Sequelize } = require("../../models")
const { like } = Sequelize.Op

let router = express.Router()

router.get("/:id(\\d+)?", (req, res) => {
  let queryOpts = {
    order: ["name"],
    where: {},
  }

  if (req.params.id) {
    queryOpts.where.id = req.params.id
  }
  if (req.query.name) {
    queryOpts.where.name = { [like]: `%${req.query.name}%` }
  }

  Attribute.findAll(queryOpts).then(results => {
    let attrs = results.map(item => item.get())
    res.send({ attributes: attrs, timestamp: Date.now() })
  })
})

router.get("/:id/paints", (req, res) => {
  let id = req.params.id

  Attribute.findByPk(id).then(attr => {
    attr.getPaints({ order: ["id"] }).then(results => {
      let paints = results.map(item => {
        item = item.get()
        delete item.PaintsAttributes
        return item
      })
      res.send({ paints: paints, timestamp: Date.now() })
    })
  })
})

module.exports = router
