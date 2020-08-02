const mongoose = require('mongoose');

const PaintingsSchema = mongoose.Schema({
  collection_id:{
    type: String
  },

  name: {
    type: String
  },

  image_string:{
    type: String,
    maxlength: 100000000,
  },

  dimensions:{
    type: String
  },

  medium:{
    type: String
  },

  price: {
    type: String
  },

  description: {
    type: String
  }
})

module.exports = mongoose.model('Paintings', PaintingsSchema);