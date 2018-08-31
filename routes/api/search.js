var express = require('express')
var router = express.Router()
var { searchDocuments } = require('../../elasticsearch')
var { getAccessibleIndices } = require('../../db')

router.get('/:term', function(req, res, next) {
  // assume the user 'foo' has already been authenticated,
  // would normally get user from req
  var user = 'foo'

  getAccessibleIndices(user)
    .then(indices => searchDocuments(indices, req.params.term))
    .then(serializeSearchResults)
    .then(serializedResults => res.json(serializedResults))
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

function serializeSearchResults(results) {}

module.exports = router
