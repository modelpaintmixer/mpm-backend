/*
 * Functionality for /api/attribute
 */

const express = require("express")

const { Attribute } = require("../../models")

let router = express.Router()

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    let id = req.params.id

    if (id.match(/^\d+$/)) {
      Attribute.findByPk(id).then(result => {
        if (result) {
          res.send({ attribute: result.get() })
        } else {
          let error = { message: `No attribute with id "${id}" found` }
          res.send({ error })
        }
      })
    } else {
      Attribute.findOne({ where: { name: id } }).then(result => {
        if (result) {
          res.send({ attribute: result.get() })
        } else {
          let error = { message: `No attribute with name "${id}" found` }
          res.send({ error })
        }
      })
    }
  } else {
    Attribute.findAll({ order: ["name"] }).then(results => {
      let attributes = results.map(item => item.get())
      res.send({ attributes })
    })
  }
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
        res.send({ paints })
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
