const express = require('express')
const Access = require('../../models/Access')
const Config = require('../../models/Config')
module.exports = app => {
  const access = express.Router()

  access.get('/info', async (req, res) => {
    const model = {
      times: (await Config.findOne({ name: 'times' })).value || 0,
      'today-times':
        (await Config.findOne({ name: 'today-times' })).value.times || 0,
      state: true
    }
    res.send(model)
  })

  access.get('/total', async (req, res) => {
    const model = await Access.find({})
    res.send(model)
  })
  app.use('/api/access', access)
}
