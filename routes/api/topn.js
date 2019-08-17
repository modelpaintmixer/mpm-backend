/*
 * Functionality for /api/topn
 */

const express = require("express")
const { Color, Period, sequelize } = require("../../models")

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
  let originQuery = `
    SELECT o.id                                           AS id,
          o.name                                          AS name,
          COALESCE(p_count, 0)                            AS paint_count,
          COALESCE(c_count, 0)                            AS color_count
    FROM   Origins o
          LEFT OUTER JOIN (SELECT originId,
                                  COUNT(*) AS p_count
                            FROM   Paints
                            GROUP  BY originId) AS p
                        ON p.originId = o.id
          LEFT OUTER JOIN (SELECT originId,
                                  COUNT(*) AS c_count
                            FROM   Colors
                            GROUP  BY originId) AS c
                        ON c.originId = o.id
    ORDER BY color_count DESC, paint_count DESC, name
  `
  let options = {
    type: sequelize.QueryTypes.SELECT,
  }

  if (req.params.count) {
    // "+" is necessary to force count to a number for MySQL
    let count = req.params.count ? +req.params.count : 5
    options.replacements = [count]
    originQuery += "LIMIT ?"
  }

  sequelize.query(originQuery, options).then(origins => {
    let topn = origins.map(item => {
      item.text = item.name
      item.url = `/origin/?id=${item.id}`

      return item
    })
    res.send({ topn: topn, timestamp: Date.now() })
  })
})

module.exports = router
