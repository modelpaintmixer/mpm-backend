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
    let attributes = results.map(item => item.get())
    res.send({ attributes, timestamp: Date.now() })
  })
})

router.get("/:id(\\d+)/paints", (req, res) => {
  let id = req.params.id

  Attribute.findByPk(id).then(attr => {
    if (attr) {
      attr.getPaints({ order: ["id"] }).then(results => {
        let paints = results.map(item => {
          item = item.get()
          delete item.PaintsAttributes
          return item
        })
        res.send({ paints, timestamp: Date.now() })
      })
    } else {
      let error = {
        message: `No attribute with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

module.exports = router
