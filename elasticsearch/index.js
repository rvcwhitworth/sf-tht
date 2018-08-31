var elasticsearch = require('elasticsearch')
var ELASTICSEARCH_SERVER_HOST = process.env.ELASTICSEARCH_SERVER_HOST || 'localhost:9200'
var data = require('../data.json')

var client = new elasticsearch.Client({
  host: ELASTICSEARCH_SERVER_HOST,
  log: 'error'
})

function resetIndicesAndAddData() {
  var indices = ['foo_index', 'bar_index', 'baz_index']
  Promise.all(indices.map(resetIndexAndAddData))
    .then(() => console.log('Successfully reset Elasticsearch indices and added data'))
    .catch(err => console.error(err))
}

function resetIndexAndAddData(index) {
  return indexExists(index)
    .then(exists => (exists ? deleteIndex(index) : null))
    .then(() => createIndex(index))
    .then(() => addData(index))
}

function createIndex(index) {
  return client.indices.create({ index })
}

function deleteIndex(index) {
  return client.indices.delete({ index })
}

function indexExists(index) {
  return client.indices.exists({ index })
}

function addData(index) {
  var index_data = data[index]
  var body = index_data.map((document, id) => mapDataToAction(document, id + 1, index)).reduce(reduceDataAndAction, [])
  return client.bulk({ body })
}

function reduceDataAndAction(body, actionWithData) {
  body.push(...actionWithData)
  return body
}

function mapDataToAction(document, id, index) {
  return [{ index: { _index: index, _type: 'docs', _id: id } }, document]
}

function searchDocuments(indices, term) {
  return client
    .search({
      index: indices,
      q: 'first_name:' + term
    })
    .then(results => results.hits.hits)
}

module.exports = {
  resetIndicesAndAddData,
  searchDocuments
}
