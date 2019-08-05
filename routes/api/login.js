/**
 * 登陆接口
 */

const express = require('express')
const assert = require('http-assert')
const User = require('../../models/User')
module.exports = app => {
  const router = express.Router()

  router.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    const token = require('jsonwebtoken').sign(
      {
        id: user._id
      },
      app.get('key')
    )
    res.send(token)
  })

  app.use('/api/login', router)
}
