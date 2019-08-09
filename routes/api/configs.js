const express = require('express')
const Config = require('../../models/Config')
const auth = require('../../middlewares/auth')()
module.exports = app => {
  const router = express.Router({
    mergeParams: true
  })
  const query = express.Router()
  router.get('/', async (req, res) => {
    const info = await Config.findOne({ name: 'information' })
    const times = await Config.findById(info.value.times.oid)
    info.value.times = times
    res.send(info)
  })

  // 查询接口
  query.get('/:query', async (req, res) => {
    const query = req.params.query
    const info = await Config.findOne({ name: query })
    res.send(info)
  })

  // 任意设置提交接口
  query.post('/:name', auth, async (req, res) => {
    const model = req.body
    const type = model.type || 'object'
    const name = req.params.name
    const value = type === 'object' ? model : model.value

    if (!!(await Config.findOne({ name }))) {
      const info = await Config.updateOne({ name }, { value })

      res.send(info)
    } else {
      const info = value
        ? await Config.create({ name, value })
        : {
            msg: '没有定义数据'
          }
      res.send(info)
    }
  })

  router.get('/all', auth, async (req, res) => {
    const model = await Config.find({})
    res.send(model)
  })

  app.use('/api/info/query', query)
  app.use('/api/info', router)
}
