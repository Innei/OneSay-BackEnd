const express = require('express')
const Say = require('../../models/Say')
const Config = require('../../models/Config')

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
  router.get('/my-info', async (req, res) => {
    const info = await Config.findOne({ name: "my-info" })
    
    res.send(info)
  })
  app.use('/api/info', router)
}
