const moogoose = require('mongoose')
const Config = require('../models/Config')

module.exports = options => async (req, res, next) => {
  let time_id = null
  if (await Config.findOne({ name: 'times' })) {
    time_id = (await Config.findOneAndUpdate(
      { name: 'times' },
      {
        $inc: {
          value: 1
        }
      }
    ))._id
  } else {
    time_id = (await Config.create({ name: 'times', value: 1 }))._id
  }
  if (!(await Config.findOne({ name: 'information' }))) {
    await Config.create({
      name: 'information',
      value: {
        name: '一言',
        slug: 'One-Say',
        info: '随机一言接口',
        times: {
          $ref: 'configs',
          $id: moogoose.Types.ObjectId(time_id),
          $db: 'says_api'
        }
      }
    })
  }
  next()
}
