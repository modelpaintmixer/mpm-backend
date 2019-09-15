/*
 * Functionality for /api/minimal
 */

const express = require("express")

const {
  Attribute,
  Color,
  Manufacturer,
  NewsItem,
  Origin,
  Paint,
  Period,
  SiteCookie,
} = require("../../models")
const names = { manufacturer: "fullName" }
const modelsMap = {
  attribute: Attribute,
  color: Color,
  manufacturer: Manufacturer,
  newsitem: NewsItem,
  origin: Origin,
  paint: Paint,
  period: Period,
  sitecookie: SiteCookie,
}

let router = express.Router()

router.get("/:table/:count(\\d+)?/:from(\\d+)?", (req, res) => {
  let table = req.params.table
  let count = req.params.count
  let from = req.params.from
  let name = names[table] || "name"
  let queryOpts = { attributes: ["id", name], order: [name] }

  if (count) {
    queryOpts.limit = count
  }
  if (from) {
    queryOpts.offset = from
  }

  modelsMap[table].findAll(queryOpts).then(results => {
    let data = results.map(item => item.get())
    res.send({ data })
  })
})

module.exports = router
