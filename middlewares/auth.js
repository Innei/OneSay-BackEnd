const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const User = require('../models/User')
const unAuthStatusCode = 401
module.exports = options => async (req, res, next) => {
  const token = req.headers.authorization || ''

  try {
    assert(token, unAuthStatusCode, 'jwt必须提供')
  } catch (error) {
    res.status(unAuthStatusCode).send({ ...error, code: unAuthStatusCode })
  }
  // req.app.get === app.get   app => express 实例 ,因为这里 express实例 取不到

  try {
    const tokenData = jwt.verify(token, req.app.get('key')) // 验证
    const isExist = Boolean(await User.findById(tokenData.id))
    if (isExist) {
      next()
    } else {
      throw {
        msg: "token 无效"
      }
    }
  } catch (error) {
    res.status(unAuthStatusCode).send({ ...error, code: unAuthStatusCode })
  }
}
