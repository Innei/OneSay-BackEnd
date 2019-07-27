const express = require('express')
const Say = require('../../models/Say')
const Config = require('../../models/Config')
module.exports = app => {
  const router = express.Router({
    mergeParams: true
  })
  router.get('/', async (req, res) => {
    const num = await Config.findOne({ name: 'total' })
    ? (await Config.findOne({ name: 'total' })).value
      : 0
    if (num) {
      const random = Math.floor(Math.random() * num)
      const item = await Say.findOne().skip(random)
      res.send({
        random,
        item
      })
    }
  })
  router.get('/all', async (req, res) => {
    const saysItems = await Say.find()
    res.send(saysItems)
  })

  app.use('/api/says', router)
}
