const Config = require('./../models/Config')

module.exports = option => {
  return async (req, res, next) => {
    const today = +new Date().getDate()

    const isExistField = (await Config.findOne({ name: 'today-times' }))
      ? true
      : false

    if (!isExistField) {
      await Config.create({
        name: 'today-times',
        value: {
          today,
          times: 1
        }
      })
    } else {
      const yesterday = (await Config.findOne({ name: 'today-times' })).value
        .today
      if (yesterday !== today) {
        await Config.updateOne(
          { name: 'today-times' },
          {
            value: {
              today,
              times: 1
            }
          }
        )
      } else {
        await Config.updateOne(
          { name: 'today-times' },
          {
            $inc: {
              "value.times": 1
            }
          }
        )
      }
    }
    next()
  }
}
