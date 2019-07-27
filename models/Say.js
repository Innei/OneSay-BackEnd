const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: Number
  },
  author: {
    type: String
  },
  content: {
    type: String
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  },
  create_time: {
    type: String
  },
  modify_time: {
    type: String
  }
})
module.exports = mongoose.model('Say', schema)
