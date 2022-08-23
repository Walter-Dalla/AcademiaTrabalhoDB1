require('./src/database').connect()
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

require('./src/domain/controllers/genericController')(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
