const express = require('express')
const path = require("path")
const routeDir = require("../util/path")
const router = express.Router()
const products = []
router.get("/add-product", (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
    //  res.render("add-product", { pageTitle: "add product", path: "/admin/add-product" })
    // res.sendfile(path.join(routeDir, "views", "add-product.html"))
    // res.send("<form action='product' method='POST'><input type='text' name='title'><button type='submit'>Submit</button></form>")
    //   next()
})
router.post("/add-product", (req, res, next) => {
    // console.log(req.body)
    products.push({ title: req.body.title })
    res.redirect('/');
})
//module.exports = router
exports.routes = router
exports.products = products