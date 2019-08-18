const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const monoConnect = require('./util/database').mongoConnect

const errorController = require('./controllers/error');

const User = require('./models/user')


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//register a middleware to attach the user to incomming requests
app.use((req, res, next) => {
    return User.findById("5d599643161f412d788aac10").then(user => {
        req.user = user;
        next();

    }).catch(err => {
        console.log(err)

    })


})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
monoConnect(() => {
    app.listen(3000);
})






// sql associations ///
// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart)
// Cart.belongsTo(User)
// Cart.belongsToMany(Product, { through: CartItem })
// Product.belongsToMany(Cart, { through: CartItem })
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem })
// ////////////////////////////
// //sync({ force: true }).
// sequlize.sync().then((result) => {
//     // console.log(result)

//     return User.findByPk(1)
// }).then(user => {
//     if (!user) {
//         return User.create({
//             name: "user1",
//             email: "test@test.com"
//         })
//     }
//     return Promise.resolve(user)
// }).then(user => {
//     //console.log(user)
//     return user.createCart()

// }).then(user => {
//     app.listen(3000);
// })
//     .catch(err => {
//         console.log(err)
//     })

//app.listen(3000);
