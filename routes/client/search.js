var express = require('express')
var router = express.Router()
var http = require('http')

router.get('/', function(req, res, next) {
  fetchAPIData(req.query.searchTerm)
    .then(({ results }) => {
      res.render('results', { results })
    })
    .catch(error => {
      res.render('error', { error })
    })
})

function fetchAPIData(searchTerm) {
  var options = {
    host: process.env.API_URL || 'localhost',
    port: process.env.API_PORT || '80',
    path: '/search/' + searchTerm
  }

  return new Promise((resolve, reject) => {
    http
      .get(options, apiResponse => {
        var results = ''
        apiResponse
          .on('data', chunk => {
            results += chunk
          })
          .on('end', () => {
            resolve(JSON.parse(results))
          })
      })
      .on('error', error => {
        reject(error)
      })
  })
}

module.exports = router
