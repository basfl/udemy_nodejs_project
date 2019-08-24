const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')


const connection_string = require('./util/decrept')
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
    return User.findById("5d618549ff19836f1cd09cbe").then(user => {
        req.user = user;
        next();

    }).catch(err => {
        console.log(err)

    })


})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(connection_string).then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({ name: "user1", email: "a@a.com", cart: { items: [] } })
            user.save()
        }
    })

    app.listen(3000)
}).catch(err => {
    console.log(err)
})

