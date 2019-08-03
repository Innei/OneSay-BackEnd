const express = require('express')
const Say = require('../../models/Say')
const Config = require('../../models/Config')

module.exports = app => {
  const router = express.Router({
    mergeParams: true
  })
  const query = express.Router()
  router.get('/', async (req, res) => {
    const info = await Config.findOne({ name: 'information' })
    const times = await Config.findById(info.value.times.oid)
    info.value.times = times
    res.send(info)
  })

  query.get('/:query', async (req, res) => {
    const query = req.params.query
    const info = await Config.findOne({ name: query })
    res.send(info)
  })
  
  app.use('/api/info/query', query)
  app.use('/api/info', router)
}
