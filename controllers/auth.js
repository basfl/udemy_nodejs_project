const User = require('../models/user')
exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    //     .get('Cookie')
    //     .split(';')[1]
    //     .trim()
    //     .split('=')[1];
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    req.session.isLoggedIn = true
    User.findById("5d618549ff19836f1cd09cbe").then(user => {
        req.session.user = user;
        res.redirect('/');

    }).catch(err => {
        console.log(err)

    })
   
};

