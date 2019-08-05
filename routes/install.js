/**
 * 登陆界面 暂定
 */

const express = require('express')
const User = require('../models/User')
const Config = require('../models/Config')
module.exports = app => {
  const router = express.Router()

  router.get('/', async (req, res) => {
      const hasUser = !!(await User.findOne())
      if (hasUser) {
          res.redirect('/api/says')
      }
      else {
          
      }
    res.send(hasUser)
  })
  app.use('/install', router)
}
