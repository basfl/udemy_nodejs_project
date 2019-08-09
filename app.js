const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequlize = require("./util/database")
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//register a middleware to attach the user to incomming requests
app.use((req, res, next) => {
    return User.findByPk(1).then(user => {
        req.user = user;
        next();

    }).catch(err => {
        console.log(err)

    })

})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})
//sync({ force: true }).
sequlize.sync({force:true}).then((result) => {
    // console.log(result)

    return User.findByPk(1)
}).then(user => {
    if (!user) {
        return User.create({
            name: "user1",
            email: "test@test.com"
        })
    }
    return Promise.resolve(user)
}).then(user => {
    //console.log(user)
    app.listen(3000);
})
    .catch(err => {
        console.log(err)
    })

//app.listen(3000);
