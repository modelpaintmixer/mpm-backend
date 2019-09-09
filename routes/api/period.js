/*
 * Functionality for /api/period
 */

const express = require("express")

const { Period } = require("../../models")

let router = express.Router()

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    let id = req.params.id

    if (id.match(/^\d+$/)) {
      Period.findByPk(id).then(result => {
        if (result) {
          res.send({ period: result.get() })
        } else {
          let error = { message: `No period with id "${id}" found` }
          res.send({ error })
        }
      })
    } else {
      Period.findOne({ where: { name: id } }).then(result => {
        if (result) {
          res.send({ period: result.get() })
        } else {
          let error = { message: `No period with name "${id}" found` }
          res.send({ error })
        }
      })
    }
  } else {
    Period.findAll({ order: ["name"] }).then(results => {
      let periods = results.map(item => item.get())
      res.send({ periods })
    })
  }
})

router.get("/:id(\\d+)/standards", (req, res) => {
  let id = req.params.id

  Period.findByPk(id).then(period => {
    if (period) {
      period.getStandards({ order: ["id"] }).then(results => {
        let standards = results.map(item => {
          item = item.get()
          delete item.PeriodsStandards
          return item
        })
        res.send({ standards })
      })
    } else {
      let error = {
        message: `No period with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

module.exports = router
