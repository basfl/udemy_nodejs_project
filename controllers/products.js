
const products = []
exports.getAddProduct = (req, res, next) => {
    
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
    //  res.render("add-product", { pageTitle: "add product", path: "/admin/add-product" })
    // res.sendfile(path.join(routeDir, "views", "add-product.html"))
    // res.send("<form action='product' method='POST'><input type='text' name='title'><button type='submit'>Submit</button></form>")
    //   next()
}

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body)
    products.push({ title: req.body.title })
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
   // const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
    //  res.render("shop", { prods: products, pageTitle: "shop", path: "/" })
    // res.sendFile(path.join(routeDir, "views", "shop.html"))
    // res.send("<h1>hello from express</h1>")
    //   next()
}