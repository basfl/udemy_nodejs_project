const express = require('express')
const path = require("path")
//const routeDir = require("../util/path")
const productsController = require('../controllers/products')
const router = express.Router()

router.get("/add-product", productsController.getAddProduct)
router.post("/add-product", productsController.postAddProduct)
module.exports = router

//exports.routes = router
//exports.products = products