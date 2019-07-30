/*
 * Functionality for /api/standard
 */

const express = require("express")

const { Standard, Sequelize } = require("../../models")
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

  Standard.findAll(queryOpts).then(results => {
    let standards = results.map(item => item.get())
    res.send({ standards: standards, timestamp: Date.now() })
  })
})

router.get("/:id/periods", (req, res) => {
  let id = req.params.id

  Standard.findByPk(id).then(standard => {
    standard.getPeriods({ order: ["id"] }).then(results => {
      let periods = results.map(item => {
        item = item.get()
        delete item.PeriodsStandards
        return item
      })
      res.send({ periods: periods, timestamp: Date.now() })
    })
  })
})

module.exports = router
