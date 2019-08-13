const express = require('express')
const Say = require('../../models/Say')
const Config = require('../../models/Config')
const isConfig = require('../../middlewares/isConfig')()
const auth = require('../../middlewares/auth')()
const ip = require('../../middlewares/ip')()
const Analyse = require('../../middlewares/analyse')()
module.exports = app => {
  const router = express.Router({
    mergeParams: true
  })
  router.use(ip)
  router.get('/', isConfig, Analyse,async (req, res) => {
    const num = (await Config.findOne({ name: 'total' }))
      ? (await Config.findOne({ name: 'total' })).value
      : 0
    if (num) {
      let random = Math.floor(Math.random() * num)
      const item = await Say.findOne().skip(random)
      const id = item.id
      await Say.updateOne(
        { id },
        {
          $inc: {
            views: 1
          }
        }
      )
      res.send({
        item
      })
    } else {
      res.send({
        msg: '没有数据'
      })
    }
  })
  router.get('/all', isConfig, async (req, res) => {
    let id = 0
    const saysItems = (await Say.find()).map(item => {
      // delete item["__v"]
      item.id = ++id
      return item
    })
    res.send(saysItems)
  })

  router.post('/new', auth, async (req, res) => {
    const { author, content } = req.body
    let id = 0
    if (!(await Config.findOne({ name: 'total' }))) {
      const config = await Config.create({
        name: 'total',
        value: 1
      })
      id = 1
    } else {
      await Config.findOneAndUpdate(
        { name: 'total' },
        {
          $inc: {
            value: 1
          }
        }
      )
      id = (await Config.findOne({ name: 'total' })).value
    }
    const model = await Say.create({
      id,
      author,
      content,
      create_time: Date.now()
    })

    res.send(model)
  })
  router.put('/modify/:id', auth, async (req, res) => {
    const id = req.params.id
    const { author, content } = req.body
    const item = await Say.updateOne(
      { id },
      {
        author,
        content,
        modify_time: Date.now()
      }
    )
    res.send(item)
  })

  router.get('/like', async (req, res) => {
    const id = req.query.id
    const isExistField = (await Say.findOne({ id })).likes

    if (isExistField) {
      Say.updateOne(
        { id },
        {
          $inc: {
            likes: 1
          }
        }
      )
        .then(ok => {
          res.send({
            msg: '感谢您的点赞~',
            code: 200,
            color: 'green',
            time: Date.now()
          })
        })
        .catch(err =>
          res.status(500).send({
            msg: '出错了',
            code: 500,
            color: 'red',
            time: Date.now()
          })
        )
    } else {
      Say.updateOne({ id }, { $set: { likes: 1 } })
        .then(ok => {
          res.send({
            msg: '感谢您的点赞~',
            code: 200,
            color: 'green',
            time: Date.now()
          })
        })
        .catch(err =>
          res.status(500).send({
            msg: '出错了',
            code: 500,
            color: 'red',
            time: Date.now()
          })
        )
    }
  })

  app.use('/api/says', router)

  require('./configs')(app)
}
