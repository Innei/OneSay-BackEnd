require('../plugins/db')()
const fs = require('fs')
const Say = require('../models/Say')
const Config = require('../models/Config')
const dir = fs.readdirSync(__dirname + '/../uploads/parsed')
let num = 0
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
        const obj = {}
        if (split_line.length === 3) {
          obj.author = split_line[2].trim()
          obj.content = split_line[0].trim()
        } else {
          obj.content = split_line[0].trim()
        }
        obj.create_time = Date.now()
          Say.create(obj)
          ++num
      }
    }
    // fs.unlink(__dirname + '/../uploads/parsed/' + item, err => {
    //   if (err) throw err
    //   console.log('文件已删除')
    // })
  })
  ;(async () => {
    const field = await Config.findOne({ name: 'total' })

    if (!field) {
      const res = await Config.create({ name: 'total', value: num })

      console.log(res)
    } else {
      let num_inside = field.value

      const total = await Config.findOneAndUpdate(
        { name: 'total' },
        { value: num_inside + num }
      )
        console.log(total)
    }
  })()
}
