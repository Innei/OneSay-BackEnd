require('../plugins/db')()
const fs = require('fs')
const Say = require('../models/Say')
const Config = require('../models/Config')
const dir = fs.readdirSync(__dirname + '/../uploads/parsed')
let num = 0
;(async () => {
  let id = (await Say.findOne().sort({ id: -1 })).id

  if (dir) {
    dir.forEach(item => {
      const fc = fs.readFileSync(__dirname + '/../uploads/parsed/' + item, {
        encoding: 'utf-8'
      })
      const lines = fc.split('\n')
      for (let line of lines) {
        if (line) {
          const reg = /(-----|----|---|--|————|——)/g
          const split_line = line.split(reg)
          let obj = {}
          if (split_line.length === 3) {
            obj.author = split_line[2].trim()
            obj.content = split_line[0].trim()
          } else {
            obj.content = split_line[0].trim()
          }
          obj = {
            ...obj,
            create_time: Date.now(),
            likes: 0,
            views: 0,
            id: id++
          }
          // obj.create_time = Date.now()
          // obj.likes = 0
          // obj.views = 0
          // TODO 加入 ID字段
          Say.create(obj)
          ++num
        }
      }
      // fs.unlink(__dirname + '/../uploads/parsed/' + item, err => {
      //   if (err) throw err
      //   console.log('文件已删除')
      // })
    })

    const field = await Config.findOne({ name: 'total' })

    if (!field) {
      const res = await Config.create({ name: 'total', value: num })
    } else {
      //  let num_inside = field.value

      const total = await Config.update(
        { name: 'total' },
        {
          $inc: {
            value: num
          }
        }
      )
    }
  }
})()
