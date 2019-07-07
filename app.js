const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
//const expressHbs = require('express-handlebars');



const app = express()

// app.engine(
//     'hbs',
//     expressHbs({
//       layoutsDir: 'views/layouts/',
//       defaultLayout: 'main-layout',
//       extname: 'hbs'
//     })
//   );
app.set('view engine', 'ejs');
//app.set("view engine", "pug")
app.set("views", "views")
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use("/admin", adminRoutes)
app.use(shopRoutes)
app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: "/" });
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})


//const server = http.createServer(app)
app.listen(3000);



