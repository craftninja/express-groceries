var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GrocerySchema = new Schema({
  item: {type: String, default: ''},
  quantity: {type: Number, default: 0},
  inBasket: {type: Boolean, default: false}
});

mongoose.model('Grocery', GrocerySchema);
