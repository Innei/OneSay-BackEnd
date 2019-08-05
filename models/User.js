const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('User', Schema)
