const jwt = require('jsonwebtoken')
const assert = require('http-assert')

module.exports = options => async (req, res, next) => {
  const token = req.headers.authorization || ''
  assert(token, 401, 'jwt必须提供')
  // req.app.get === app.get   app => express 实例 ,因为这里 express实例 取不到
  const tokenData = jwt.verify(token, req.app.get('key')) // 验证
}
