const express = require('express')
const path = require("path")
const routeDir=require("../util/path")
const router = express.Router()
router.get("/add-product", (req, res, next) => {

    res.sendfile(path.join(routeDir, "views", "add-product.html"))
    // res.send("<form action='product' method='POST'><input type='text' name='title'><button type='submit'>Submit</button></form>")
    //   next()
})
router.post("/add-product", (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})
module.exports = router