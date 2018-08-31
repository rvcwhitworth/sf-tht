var express = require('express')
var router = express.Router()
var util = require('util')
var exec = util.promisify(require('child_process').exec)

var { searchDocuments } = require('../../elasticsearch')
var { getAccessibleIndices } = require('../../db')
var CLOJURE_FILENAME = './clj/target/uberjar/clj-0.1.0-SNAPSHOT-standalone.jar'

router.get('/:term', function(req, res, next) {
  // assume the user 'foo' has already been authenticated,
  // would normally get user info from req
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

async function serializeSearchResults(results) {
  // Have to stringify twice because Clojure needs quotes escaped
  var stringifiedResults = JSON.stringify(JSON.stringify(results))
  var { stdout, stderr } = await exec(`java -jar ${CLOJURE_FILENAME} ${stringifiedResults}`)
  return { results: JSON.parse(stdout) }
}

module.exports = router
