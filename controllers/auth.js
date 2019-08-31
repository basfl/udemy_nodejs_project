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

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};
exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    req.session.isLoggedIn = true
    User.findById("5d618549ff19836f1cd09cbe").then(user => {
        req.session.user = user;
        req.session.save((err) => {
            console.group(err)
            res.redirect('/');
        })


    }).catch(err => {
        console.log(err)

    })

};

exports.postSignup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword
    User.findOne({ email: email }).then(userDoc => {
        if (userDoc) {
            console.log("user exist")
            return res.redirect("/signup")
        }
        const user = new User({ email: email, password: password, cart: { items: [] } })
        return user.save();
    }).then(result => {
        res.redirect('/login')
    })
        .catch(err => {
            console.log(err)
        })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/');
    })

}

