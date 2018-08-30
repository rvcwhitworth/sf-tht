var express = require('express')
var router = express.Router()
var API_PATH = `http://${process.env.API_URL || 'localhost'}:${process.env.API_PORT || '80'}`
var http = require('http')

router.get('/', function(req, res, next) {
  fetchAPIData()
    .then(results => {
      res.render('results', { results })
    })
    .catch(error => {
      res.render('error', { error })
    })
})

function fetchAPIData() {
  return new Promise(resolve => {
    http.get(API_PATH, apiResponse => {
      var results = ''
      apiResponse
        .on('data', chunk => {
          results += chunk
        })
        .on('end', () => {
          resolve(JSON.parse(results))
        })
        .on('error', error => {
          reject(error)
        })
    })
  })
}

module.exports = router
