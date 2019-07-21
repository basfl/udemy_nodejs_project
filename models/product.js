const fs = require('fs')
const path = require('path')
//const products = []
module.exports = class Product {
    constructor(title,imageUrl,description,price) {
        this.title = title
        this.imageUrl=imageUrl
        this.description=description
        this.price=price
    }
    save() {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        //    products.push(this)
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                console.log("***********")
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }
    static fetchAll(cb) {
        const p = path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
          if (err) {
            cb([]);
          }
          cb(JSON.parse(fileContent));
        });
      }

}