const router = require('express').Router();
const async = require('async');
const stripe = require('stripe')('sk_test_wkcPYTXmqh2Y1Qayai7cW1Bk');

const Category = require('../models/category');
const Product = require('../models/product');

router.get('/products', (req, res, next) => {
  const perPage = 10;
  
  const page = req.query.page;
  async.parallel([
    function(callback) {
      Product.count({}, (err, count) => {
        var totalProducts = count;
        callback(err, totalProducts);
      });
    },
    function(callback) {
      Product.find({})
        .skip(perPage * page)
        .limit(perPage)
        .populate('category')
        .populate('owner')
        .exec((err, products) => {
          if(err) return next(err);
          callback(err, products);
        });
    }
  ], function(err, results) {
    var totalProducts = results[0];
    var products = results[1];
   
    res.json({
      success: true,
      message: 'category',
      products: products,
      totalProducts: totalProducts,
      pages: Math.ceil(totalProducts / perPage)
    });
  });
  
});


router.route('/categories')
  .get((req, res, next) => {
    Category.find({}, (err, categories) => {
      res.json({
        success: true,
        message: "Success",
        categories: categories
      })
    })
  })
  .post((req, res, next) => {
    let category = new Category();
    category.name = req.body.category;
    category.save();
    res.json({
      success: true,
      message: "Successful"
    });
  });

router.get('/categories/:test', (req, res, next) => {
    const perPage = 10;
    const page = req.query.page;
    async.parallel([
      function(callback) {
        Product.count({ category: req.params.test }, (err, count) => {
          var totalProducts = count;
          callback(err, totalProducts);
        });
      },
      function(callback) {
        Product.find( { category: req.params.test } )
          .skip(perPage * page)
          .limit(perPage)
          .populate('category')
          .exec((err, products) => {
            if(err) return next(err);
            callback(err, products);
          });
      }
    ], function(err, results) {
      var totalProducts = results[0];
      var products = results[1];
   
      res.json({
        success: true,
        message: 'category',
        products: products,
        categoryName: req.params.test,
        totalProducts: totalProducts,
        pages: Math.ceil(totalProducts / perPage)
      });
    });
    
  });


 

module.exports = router;