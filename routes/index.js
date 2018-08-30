var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  const results = [
    {
      id: 1,
      full_name: 'fred flinstone',
      location: 'bedrock'
    },
    {
      id: 2,
      full_name: 'fred rogers',
      location: 'wonderful place'
    }
  ]
  res.render('index', { title: 'Express' })
})

module.exports = router
