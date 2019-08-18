const mongodb = require('mongodb')
const getDb = require("../util/database").getDb
const objectId = mongodb.ObjectID
class User {
  constructor(username, email) {
    this.username = username
    this.email = email
  }
  save() {

    const db = getDb()
    return db.collection('users').insertOne(this)

  }
  static findById(userId) {
    const db = getDb()
    return db.collection('users')
      .findOne({ _id: new objectId(userId) });
    //.next();
    // then(user => {
    //   return user
    // }).catch(err => {
    //   console.log(err)
    // })
  }

}

module.exports = User;