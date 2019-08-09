/**
 * 登陆界面 暂定
 */

const express = require('express')
const User = require('../models/User')
const Config = require('../models/Config')
const configs = require('../config')
const assert = require('../plugins/assert')
const backendURL = configs.backendURL || 'http://localhost:8001'

module.exports = async app => {
  const router = express.Router()

  router.get('/', async (req, res) => {
    const hasUser = !!(await User.findOne())
    if (hasUser) {
      res.redirect('/api/says')
    } else {
      res.render('install/index', {
        posturl: `${backendURL}/install`,
        loginUrl: `${backendURL}/login`
      })
    }
  })

  router.post('/', async (req, res) => {
    const hasUser = !!(await User.findOne())
    assert(!hasUser, 422, '已完成注册', res)

    const { username, password } = req.body
    assert([username, password], 422, '用户名或密码不能为空', res)
    await User.create({
      username,
      password
    })
    res.redirect('/login')
  })
  app.use('/install', router)
}
