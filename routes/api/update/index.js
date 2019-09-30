/*
 * Root of the routing for /api/update
 */

const express = require("express")

const {
  Attribute,
  NewsItem,
  Origin,
  Period,
  SiteCookie,
  Standard,
} = require("../../../models")

const router = express.Router()
const models = {
  attribute: Attribute,
  newsitem: NewsItem,
  origin: Origin,
  period: Period,
  sitecookie: SiteCookie,
  standard: Standard,
}

router.post("/:model", (req, res) => {
  let model = req.params.model,
    dbModel

  if (models[model]) {
    dbModel = models[model]
  } else {
    res.status(404).send(`Unknown update route ${model}`)
    return
  }

  const { action, id, ...body } = req.body

  if (action === "update") {
    dbModel
      .findByPk(id)
      .then(record => {
        return record.update(body)
      })
      .then(record => {
        record = record.get()
        res.send({ status: "success", record })
      })
      .catch(error => {
        error = error.errors[0]
        res.send({ status: "error", error })
      })
  } else if (action === "create") {
    dbModel
      .create(body)
      .then(record => {
        record = record.get()
        res.send({ status: "success", record })
      })
      .catch(error => {
        error = error.errors[0]
        res.send({ status: "error", error })
      })
  } else if (action === "delete") {
    dbModel
      .findByPk(id)
      .then(record => {
        if (record) {
          return record.destroy()
        } else {
          return res.send({
            status: "error",
            error: { message: `No such ${model}` },
          })
        }
      })
      .then(() => {
        res.send({ status: "success" })
      })
      .catch(error => {
        res.send({ status: "error", error })
      })
  } else {
    res.send({ status: "error", error: `Unknown action: ${action}` })
  }
})

module.exports = router
