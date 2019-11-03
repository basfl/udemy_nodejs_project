const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
//conn connect-mongodb-session will return function which expect session as arg
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const helmet = require('helmet');
const compression = require('compression');


const connection_string = require('./util/decrept');
const errorController = require('./controllers/error');
const shopController = require('./controllers/shop');
const isAuth = require('./middleware/is-auth');
const User = require('./models/user')

const app = express();

var store = new MongoDBStore({
    uri: connection_string,
    collection: 'sessions'
});

const csrfProtection = csrf();

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "images");

//     },
//     filename: (req, file, cb) => {
//         var filename = new Date().toISOString();
//         console.log("----", filename);
//         //  file.filename = filename;
//         cb(null, new Date().toISOString() + '-' + file.originalname);

//     }
// })
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv1() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth')

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, 'images')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))
// it is important to add csrf after initializing the session

app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

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
            next(new Error(err));
        });
});

app.post('/create-order', isAuth, shopController.postOrder);

app.use(csrfProtection);
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)
app.use("/500", errorController.get500)
app.use(errorController.get404);
//special midleware for errors
app.use((error, req, res, next) => {

    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });

})
console.log("env-->", process.env.NODE_ENV);
mongoose.connect(connection_string).then(result => {
    // User.findOne().then(user => {
    //     if (!user) {
    //         const user = new User({ name: "user1", email: "a@a.com", cart: { items: [] } })
    //         user.save()
    //     }
    // })

    app.listen(process.env.Port || 3000)
}).catch(err => {
    console.log(err)
})

