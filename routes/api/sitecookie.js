/*
 * Functionality for /api/sitecookie
 */

const express = require("express")

const { SiteCookie } = require("../../models")

let router = express.Router()

router.get("/", (req, res) => {
  SiteCookie.findAll({ order: ["createdAt"] }).then(results => {
    let sitecookies = results.map(item => item.get())
    res.send({ sitecookies, timestamp: Date.now() })
  })
})

router.get("/:id", (req, res) => {
  let queryOpts = { where: {} }
  let value = req.params.id

  if (value.match(/^\d+$/)) {
    queryOpts.where.id = value
  } else {
    queryOpts.where.name = value
  }

  SiteCookie.findOne(queryOpts).then(result => {
    if (result) {
      let sitecookie = result.get()
      res.send({ sitecookie, timestamp: Date.now() })
    } else {
      res.send({ error: "No cookie found for that ID" })
    }
  })
})

module.exports = router
