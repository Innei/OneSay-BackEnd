const express = require('express')
const Say = require('../../models/Say')
module.exports = app => {
  const router = express.Router({
    mergeParams: true
  })
  router.get("/", async (req, res) => {
    const random = Math.random()

  })
    router.get('/all', async(req, res) => {
      const saysItems = await Say.find()
      res.send(saysItems)
    })
  
  app.use('/api/says', router)
}
