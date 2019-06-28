const express = require('express')
const path = require("path")
const routeDir=require("../util/path")
const route = express.Router()
route.get("/", (req, res, next) => {
    res.sendFile(path.join(routeDir, "views", "shop.html"))
    // res.send("<h1>hello from express</h1>")
    //   next()
})
module.exports = route