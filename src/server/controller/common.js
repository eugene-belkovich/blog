const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  console.log('get controller')
  res.json('get controller');
})

router.post('/', function (req, res) {
  console.log('post controller', req.body)
})

module.exports = router
