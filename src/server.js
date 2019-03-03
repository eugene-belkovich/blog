const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const multer = require('multer')
const upload = multer()

const app = express();

app.use(express.static('public'))
app.use(cors())
app.use(cookieParser())
app.use(upload.array())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('./server/controller'))

app.listen(8081)
