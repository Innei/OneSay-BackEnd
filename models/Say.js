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
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
})
module.exports = mongoose.model('Say', schema)
