const express = require('express')
const config = require('./config')
const parser = require('body-parser')

const app = express()

let isInstalled = false

app.use(express.json())
app.use(require('cors')())
app.use(parser.urlencoded({ extended: false }))
app.set('key', config.key)

// require('./routes/api/login')(app)
// require('./routes/api/says')(app)
require('./routes/api/index')(app)
require('./routes/login')(app)
require('./plugins/db')(app)

// 如果没有用户就需要安装, 进入安装界面, 后续加入中间件做跳转, 想采用模板系统
require('./plugins/isInstalled')().then(res => (isInstalled = res))
if (!isInstalled) {
  app.set('views', require('path').join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  require('./routes/install')(app)
}

app.use(express.static(__dirname + '/public'))

app.listen(8001, () => {
  console.log('server is up, http://localhost:8001 ')
})
