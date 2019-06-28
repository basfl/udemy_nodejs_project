const express = require('express')
const path = require("path")
const routeDir = require("../util/path")
const adminData = require("./admin")
const route = express.Router()
route.get("/", (req, res, next) => {
     const products=adminData.products
     res.render("shop",{prods:products,docTitle:"shop"})
    // res.sendFile(path.join(routeDir, "views", "shop.html"))
    // res.send("<h1>hello from express</h1>")
    //   next()
})
module.exports = route