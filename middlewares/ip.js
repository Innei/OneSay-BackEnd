const chalk = require('chalk')
const moment = require('moment')
const Access = require('../models/Access')
module.exports = options => {
  return (req, res, next) => {
    // 时间
    const dUNIX = new Date()
    const day = dUNIX.getDate()
    const month = dUNIX.getMonth() + 1
    const year = dUNIX.getYear() + 1900
    const formatTime = moment(dUNIX).format('YYYY-MM-DD HH:mm:ss')
    // 获取 ip
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    Access.create({
      time: Date.now(dUNIX),
      formatTime,
      ip,
      path: req.originalUrl,
      method: req.method,
      fullDate: {
        year,
        month,
        day
      }
    })
    console.log(`[${chalk.yellow(formatTime)}] 来源IP ${chalk.green(ip)}`)

    next()
  }
}