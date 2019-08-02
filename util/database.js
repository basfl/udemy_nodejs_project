// const mysql=require('mysql2')
// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-complete',
//     password:''
// })
// module.exports=pool.promise()
const Sequlize = require('sequelize')
const sequlize = new Sequlize('node-complete', 'root', '', { dialect: 'mysql', host: 'localhost' })

module.exports = sequlize