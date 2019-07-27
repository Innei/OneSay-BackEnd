module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost:27017/say_api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  })
}
