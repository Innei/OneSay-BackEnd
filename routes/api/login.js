/**
 * 登陆接口
 */

const express = require('express')
const assert = require('http-assert')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const ip = require('../../middlewares/ip')
module.exports = app => {
  const router = express.Router()

  router.post('/', ip({msg: '此 ip 尝试登陆后台'}), async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username }).select('+password')

    assert(user, 422, '用户不存在')

    if (!user) {
      res.status(422).send({
        msg: '用户名不存在'
      })
    }
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    const token = jwt.sign(
      {
        id: user._id
      },
      app.get('key')
    )
    res.send({ token })
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
        msg: '身份验证已过期',
        code: 401
      })
  })
  app.use('/api/login', router)

  // 错误处理函数
  router.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 401).send({
      message: err.message
    })
  })
}
