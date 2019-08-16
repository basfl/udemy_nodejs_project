
const Sequelize = require('sequelize')
const getDb = require("../util/database").getDb

class Product {
  constructor(title, description, price, imageUrl) {
    this.title = title
    this.description = description
    this.price = price
    this.imageUrl = imageUrl

  }
  save() {
    const db = getDb()
    return db.collection("products").insertOne(this).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })

  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
}


module.exports = Product

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// const db = require('../util/database')
// const Cart = require('./cart');
// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute("insert into products (title,price,description,imageUrl) values (?,?,?,?)",
//       [this.title, this.price, this.description, this.imageUrl]);

//   }

//   static deleteById(id) {

//   }

//   static fetchAll() {
//     return db.execute("select * from products")

//   }
//   static findById(id) {
//     return db.execute("select * from products where products.id=?", [id])
//   }
// };
