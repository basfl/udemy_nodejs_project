const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
//conn connect-mongodb-session will return function which expect session as arg
const MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')
const csrf = require('csurf');
const flash = require('connect-flash')


const connection_string = require('./util/decrept')
const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

var store = new MongoDBStore({
    uri: connection_string,
    collection: 'sessions'
});

const csrfProtection = csrf();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))
// it is important to add csrf after initializing the session
app.use(csrfProtection);
app.use(flash())

//register a middleware to attach the user to incomming requests
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            throw new Error(err);
        });
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});



app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)
app.use("/500", errorController.get500)
app.use(errorController.get404);
//special midleware for errors
app.use((error,req,res,next)=>{

    res.redirect("/500")

})
mongoose.connect(connection_string).then(result => {
    // User.findOne().then(user => {
    //     if (!user) {
    //         const user = new User({ name: "user1", email: "a@a.com", cart: { items: [] } })
    //         user.save()
    //     }
    // })

    app.listen(3000)
}).catch(err => {
    console.log(err)
})

