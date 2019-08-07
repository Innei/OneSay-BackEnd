/**
 * 登陆接口
 */

const express = require('express')
const assert = require('http-assert')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
module.exports = app => {
  const router = express.Router()

  router.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    const token = jwt.sign(
      {
        id: user._id
      },
      app.get('key')
    )
    res.send(token)
  })

  router.post('/auth', async (req, res) => {
    const { token } = req.body
    const tokenData = jwt.verify(token, app.get('key')) // 验证
    const isExist = !!(await User.findById(tokenData.id))
    if (isExist) {
      res.send({
        msg: '验证通过',
        code: 200
      })
    } else
      res.send({
        msg: '本地 token 不正确',
        code: 401
      })
  })
  app.use('/api/login', router)
}
