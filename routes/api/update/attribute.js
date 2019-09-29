/*
 * Functionality for /api/update/attribute
 */

const express = require("express")

const { Attribute } = require("../../../models")

let router = express.Router()

router.post("/", (req, res) => {
  const { id, name, description, action } = req.body

  if (action === "update") {
    Attribute.findByPk(id)
      .then(attribute => {
        return attribute.update({ name, description })
      })
      .then(attribute => {
        attribute = attribute.get()
        res.send({ attribute })
      })
      .catch(error => {
        res.send({ error })
      })
  } else if (action === "create") {
    Attribute.create({ name, description })
      .then(attribute => {
        attribute = attribute.get()
        res.send({ attribute })
      })
      .catch(error => {
        res.send({ error })
      })
  } else if (action === "delete") {
    Attribute.findByPk(id)
      .then(attribute => {
        return attribute.delete()
      })
      .then(() => {
        res.send({ status: "success" })
      })
      .catch(error => {
        res.send({ error })
      })
  } else {
    res.send({ error: `Unknown action: ${action}` })
  }
})

module.exports = router
