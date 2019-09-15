const express = require("express")
const authController = require('../controllers/auth');
// js way to deconstruct basically get a method or property out of object
const { check } = require('express-validator/check')
const router = express.Router();
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin);
// adding validation middleware i.e check
router.post('/signup', check('email').isEmail().withMessage('please enter a valid email !'), authController.postSignup);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post("/new-password/", authController.postNewPassword);
module.exports = router;
