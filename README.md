# project
# Templating Engine
 * Engines
    * Pug
      * app.set("view engine", "pug")
      * app.set("views", "views")
      * [Official Pug Docs](https://pugjs.org/api/getting-started.html)
    * EJS
    * express-handlebars
# ENV on windows:
 * "start": "SET NODE_ENV=production & SET STRIPE_KEY=somekey & node app.js",
# running on Dev
 * npm run start:dev     
# ssl 
 * openssl req -nodes -new -x509 -keyout server.key -out server.cert
