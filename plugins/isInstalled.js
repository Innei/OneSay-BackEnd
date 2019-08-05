const User = require('../models/User')
module.exports = async options => {
  const hasUser = !!(await User.findOne())
  if (hasUser) {
    return true
  } else {
    return false
  }
}
