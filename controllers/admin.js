const Product = require('../models/product');
const mongodb = require('mongodb')

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};



exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, description, price, imageUrl)
  product.save().then(result => {
    //  console.log(result)
    console.log("created product")
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err)
  })

};

exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit
  console.log("$$$$$", editMode)
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: true,
        product: product
      });

    }).then(err => {
      console.log(err)
    })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  console.log("*******", updatedTitle)

  const product = new Product(updatedTitle, updatedDesc, updatedPrice, updatedImageUrl, new ObjectId(prodId))
  product.save()
    .then(result => {
      console.log("Updated Product!!")
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err)
    })

};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err)
  })

  //Product.findAll()
  // req.user.getProducts()
  // .then(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });

  // }).catch(err => {
  //   console.log(err)
  // })

};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByPk(prodId).then(product => {
    product.destroy()
  }).then(result => {
    console.log("DESTROY!!!")
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err)
  })
  // Product.deleteById(prodId);
  // res.redirect('/admin/products');

}