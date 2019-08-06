"use strict"

const port = process.env.PORT || 3000
const express = require("express")
const helmet = require("helmet")
const api = require("./routes/api")

var app = express()
app.use(helmet())
app.use("/api", api)
app.get("/", (req, res) => res.send("OK"))

console.log("Server started")
console.log(`-> NODE_ENV=${process.env.NODE_ENV}`)
for (let name of ["USERNAME", "PASSWORD", "DATABASE", "HOST"]) {
  let full = `DB_${name}`
  console.log(`-> ${full}=${process.env[full]}`)
}
app.listen(port)
