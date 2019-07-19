const express = require('express')
const path = require("path")
//const routeDir = require("../util/path")
//const adminData = require("./admin")
const shopController = require('../controllers/shop');
const router = express.Router();
router.get('/', shopController.getProducts);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
module.exports = router