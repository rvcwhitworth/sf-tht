var express = require('express')
var router = express.Router()
var { getAccessibleIndices } = require('../../db')

router.get('/:user', function(req, res, next) {
  getAccessibleIndices(req.params.user)
    .then(accessibleIndices => {
      res.json(accessibleIndices)
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

module.exports = router
