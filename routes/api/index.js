module.exports = app => {
  require('./login')(app)
  require('./says')(app)
  require('./access')(app)
}
