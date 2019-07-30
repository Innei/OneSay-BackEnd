const moogoose = require('mongoose')
const Config = require('../models/Config')

module.exports = options => async (req,res,next) => {
    if (await Config.findOne({ name: 'times' })) {
      await Config.updateOne(
        { name: 'times' },
        {
          $inc: {
            value: 1
          }
        }
      )
    } else {
      await Config.create({ name: 'times', value: 1 })
    }
    next()
}