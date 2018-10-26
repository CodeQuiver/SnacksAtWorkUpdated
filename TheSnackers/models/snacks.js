const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quanity: {
  type: Number,
  required: true
  },
  photo: {
  type: String,
  required: true
  }  

});

module.exports = mongoose.model('products', productSchema);