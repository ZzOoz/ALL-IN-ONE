var express = require('express');
var router = express.Router();
const dao = require('./common/db')
/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = await dao.query({_id:'5ffc51c5cd0e00009a001682'},'users')
  res.json(data)
});

module.exports = router;
