const assert = (val, status, msg, res) => {
  if (typeof val === 'boolean' && !val) {
    res.status(status).send({
      msg,
      status
    })
    throw msg
  }

  const valType =
    typeof val === 'string' || typeof val === 'number'
      ? 'primitive'
      : val instanceof Object && val instanceof Array
      ? 'array'
      : 'object'

  switch (valType) {
    case 'primitive':
      if (!val) {
        res.status(status).send({
          msg,
          status
        })
        throw msg
      }
      break
    case 'object':
      const values = Object.entries(val)
      for (let key of values) {
        if (!key[1]) {
          res.status(status).send({
            msg: msg || `${key[0]} 不能为空`,
            status
          })
        }
        throw msg
      }
      break
    case 'array':
      for (let i of val) {
        if (!i) {
          res.status(status).send({
            msg,
            status
          })

          throw msg
        }
      }
      break
    default:
      break
  }
}
module.exports = assert