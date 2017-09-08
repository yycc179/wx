var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query)
  res.send('ok')
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  res.send('ok')
});

module.exports = router;
