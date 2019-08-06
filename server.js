"use strict"

const port = process.env.PORT || 3000
const express = require("express")
const helmet = require("helmet")
const api = require("./routes/api")

var app = express()
app.use(helmet())
app.use("/api", api)

console.log("Server started")
app.listen(port)
