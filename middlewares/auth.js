const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const User = require('../models/User')
const log = require('../plugins/log')
const unAuthStatusCode = 401
module.exports = options => async (req, res, next) => {
  const token = req.headers.authorization || ''

  try {
    assert(token, unAuthStatusCode, 'jwt必须提供')
  } catch (error) {
    log('此次请求未携带 Token,请求无效', 1)
    return res
      .status(unAuthStatusCode)
      .send({ ...error, code: unAuthStatusCode })
  }
  // req.app.get === app.get   app => express 实例 ,因为这里 express实例 取不到

  try {
    const tokenData = jwt.verify(token, req.app.get('key')) // 验证
    const isExist = Boolean(await User.findById(tokenData.id))
    if (isExist) {
      next()
    } else {
      return log(`此次请求所携带的 Token 无效`, 1)
    }
  } catch (error) {
    return res.status(unAuthStatusCode).send({ ...error, code: unAuthStatusCode })
  }
}
