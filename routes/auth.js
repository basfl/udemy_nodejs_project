const express = require("express")
const authController = require('../controllers/auth');
// js way to deconstruct basically get a method or property out of object
const { check, body } = require('express-validator/check');
const User = require('../models/user');
const router = express.Router();
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post('/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address.').normalizeEmail() ,
        body('password', 'Password has to be valid.')
            .isLength({ min: 5 })
            .isAlphanumeric().trim()
    ]
    , authController.postLogin);
// adding validation middleware i.e check
router.post('/signup',
    [
        check('email').isEmail()
            .withMessage('please enter a valid email !')
            .custom((value, { req }) => {
                // if (value === "test@test.com") {
                //     throw new Error("This Email is Forbidden!!");
                // }
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject(
                            'E-Mail exists already, please pick a different one.'
                        );
                    }
                });
            }).normalizeEmail(),
        body("password", "please enter only alphabet and number and with at least 5 characters")
            .isLength({ min: 5 })
            .isAlphanumeric().trim(),
        body("confirmPassword").trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("passwords do not match")
            }
            return true;
        }),

    ],
    authController.postSignup);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post("/new-password/", authController.postNewPassword);
module.exports = router;
