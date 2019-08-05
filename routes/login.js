const express = require('express')
const assert = require('http-assert')
const User = require('../models/User')
module.exports = app => {
  const router = express.Router()

  router.get('/', async (req, res) => {
    const hasUser = !!(await User.findOne())
    if (!hasUser) {
      res.redirect('/install')
    }
  })
  app.use('/login', router)
}
