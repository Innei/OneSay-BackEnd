module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost:27017/api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  })
}
