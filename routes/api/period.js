/*
 * Functionality for /api/period
 */

const express = require("express")

const { Period, Sequelize } = require("../../models")
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

  Period.findAll(queryOpts).then(results => {
    let periods = results.map(item => item.get())
    res.send({ periods, timestamp: Date.now() })
  })
})

router.get("/:id/standards", (req, res) => {
  let id = req.params.id

  Period.findByPk(id).then(period => {
    period.getStandards({ order: ["id"] }).then(results => {
      let standards = results.map(item => {
        item = item.get()
        delete item.PeriodsStandards
        return item
      })
      res.send({ standards, timestamp: Date.now() })
    })
  })
})

module.exports = router
