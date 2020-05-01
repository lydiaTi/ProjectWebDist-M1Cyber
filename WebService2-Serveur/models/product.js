const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const ProductSchema = new Schema({
  
  category: String,
  title: String,
  description: String,
  price: Number,
  crated: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Product', ProductSchema);

