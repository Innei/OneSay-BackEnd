const express = require('express')
const assert = require('http-assert')
const User = require('../models/User')
const configs = require('../config')

const backendURL = configs.backendURL || 'http://localhost:8001'
module.exports = app => {
  const router = express.Router()

  router.get('/', async (req, res) => {
    const hasUser = !!(await User.findOne())
    if (!hasUser) {
      res.redirect('/install')
    }

    res.render('login/index', {
      loginApi: backendURL + '/api/login',
      saysApi: backendURL + '/api/says'
    })
  })
  
  app.use('/login', router)
}
