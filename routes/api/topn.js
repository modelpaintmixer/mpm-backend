/*
 * Functionality for /api/topn
 */

const express = require("express")
const { Color, Period, Origin } = require("../../models")

let router = express.Router()

router.get("/color/:count(\\d+)?", (req, res) => {
  // "+" is necessary to force count to a number for MySQL
  let count = req.params.count ? +req.params.count : 5

  Color.findAll({
    limit: count,
    order: [["updatedAt", "DESC"], "name"],
  }).then(colors => {
    let topn = colors.map(item => {
      item = item.get()

      return {
        text: item.name,
        url: `/color/?id=${item.id}`,
        id: item.id,
      }
    })

    res.send({ topn: topn, timestamp: Date.now() })
  })
})

router.get("/period/:count(\\d+)?", (req, res) => {
  // "+" is necessary to force count to a number for MySQL
  let count = req.params.count ? +req.params.count : 5

  Period.findAll({
    limit: count,
    order: ["fromYear"],
  }).then(periods => {
    let topn = periods.map(item => {
      item = item.get()

      return {
        text: item.name,
        url: `/period/?id=${item.id}`,
        id: item.id,
      }
    })

    res.send({ topn: topn, timestamp: Date.now() })
  })
})

router.get("/origin/:count(\\d+)?", (req, res) => {
  // "+" is necessary to force count to a number for MySQL
  let count = req.params.count ? +req.params.count : 5

  Origin.findAll({
    limit: count,
    order: ["name"],
  }).then(origins => {
    let topn = origins.map(item => {
      item = item.get()

      return {
        text: item.name,
        url: `/origin/?id=${item.id}`,
        id: item.id,
      }
    })

    res.send({ topn: topn, timestamp: Date.now() })
  })
})

module.exports = router
