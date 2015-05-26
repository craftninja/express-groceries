var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Grocery = mongoose.model('Grocery');

router.get('/', function(req, res, next) {
  Grocery.find({}, function(err, groceries) {
    if (err) return console.log(err);
    res.render('groceries/index', {groceries: groceries})
  });
});

router.get('/new', function(req, res, next) {
  Grocery.findOne({_id: req.params.id}, function(err, grocery) {
    if (err) return console.log(err);
    res.render('groceries/new', {grocery: grocery});
  });
});

router.post('/', function(req, res, next) {
  grocery = new Grocery({
    item: req.body['grocery[item]'],
    quantity: req.body['grocery[quantity]'],
    inBasket: req.body['grocery[inBasket]']
  });
  grocery.save(function(err, grocery) {
    res.redirect('/groceries/' + grocery.id);
  });
});

router.get('/:id', function(req, res, next) {
  Grocery.findOne({_id: req.params.id}, function(err, grocery) {
    if (err) return console.log(err);
    res.render('groceries/show', {grocery: grocery});
  });
})

module.exports = router;
