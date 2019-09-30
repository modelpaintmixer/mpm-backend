/*
 * Functionality for /api/update/attribute
 */

const express = require("express")

const { Attribute } = require("../../../models")

const router = express.Router()

router.post("/", (req, res) => {
  const { id, name, description, action } = req.body

  if (action === "update") {
    Attribute.findByPk(id)
      .then(attribute => {
        return attribute.update({ name, description })
      })
      .then(attribute => {
        attribute = attribute.get()
        res.send({ status: "success", attribute })
      })
      .catch(error => {
        error = error.errors[0]
        res.send({ status: "error", error })
      })
  } else if (action === "create") {
    Attribute.create({ name, description })
      .then(attribute => {
        attribute = attribute.get()
        res.send({ status: "success", attribute })
      })
      .catch(error => {
        error = error.errors[0]
        res.send({ status: "error", error })
      })
  } else if (action === "delete") {
    Attribute.findByPk(id)
      .then(attribute => {
        if (attribute) {
          return attribute.destroy()
        } else {
          return res.send({
            status: "error",
            error: { message: "No such attribute" },
          })
        }
      })
      .then(() => {
        res.send({ status: "success" })
      })
      .catch(error => {
        console.log(JSON.stringify(error))
        // error = error.errors[0]
        res.send({ status: "error", error })
      })
  } else {
    res.send({ status: "error", error: `Unknown action: ${action}` })
  }
})

module.exports = router
