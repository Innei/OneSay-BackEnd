const express = require('express')
const Say = require('../../models/Say')
const Config = require('../../models/Config')
const isConfig = require('../../middlewares/isConfig')()
module.exports = app => {
  const router = express.Router({
    mergeParams: true
  })
  router.get('/', async (req, res) => {
    const info = await Config.findOne({ name: 'information' })
    const times = await Config.findById(info.value.times.oid)
    info.value.times = times
    res.send(info)
  })
  app.use('/api/says/info', router)
}
