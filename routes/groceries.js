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

module.exports = router;
