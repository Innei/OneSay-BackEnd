const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
       type: String
    },
    value: {
       
    }
})

module.exports = mongoose.model('Config', schema)
