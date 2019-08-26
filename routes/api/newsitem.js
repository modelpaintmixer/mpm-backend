/*
 * Functionality for /api/newsitem
 */

const express = require("express")

const { User, NewsItem } = require("../../models")

let router = express.Router()

router.get("/", (req, res) => {
  NewsItem.findAll({ order: [["updatedAt", "DESC"]], include: [User] }).then(
    results => {
      let newsitems = results.map(item => item.get())
      res.send({ newsitems, timestamp: Date.now() })
    }
  )
})

router.get("/:id", (req, res) => {
  let id = req.params.id

  NewsItem.findByPk(id, { include: [User] }).then(newsitem => {
    newsitem = newsitem.get()

    res.send({ newsitem, timestamp: Date.now() })
  })
})

module.exports = router
