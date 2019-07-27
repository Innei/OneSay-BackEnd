const express = require('express')

const app = express()
app.use(express.json())

require('./routes/api/says')(app)
require('./plugins/db')(app)

app.listen(8001, () => {
  console.log('server is up, http://localhost:8001 ')
})
