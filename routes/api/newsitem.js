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
      res.send({ newsitems })
    }
  )
})

router.get("/:id(\\d+)", (req, res) => {
  let id = req.params.id

  NewsItem.findByPk(id, { include: [User] }).then(newsitem => {
    if (newsitem) {
      newsitem = newsitem.get()

      res.send({ newsitem })
    } else {
      let error = {
        message: `No news item with id "${id}" found`,
      }

      res.send({ error })
    }
  })
})

module.exports = router
