var express = require('express');
var router = express.Router();
const wechat = require('wechat');

var api = new WechatAPI('wx752686772c3e8225', '1e050558f68abfb72675a0d01eca5e2a');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('ok')
});

var i = 0
router.get('/wechat', function(req, res, next) {
  api.sendText('o3NPW0r_fi2BL8-zYrJuryidCuCY', 'Hello ' + ++ i, (err, r) => {
    r.err = err
    res.json(r)
  });
});


module.exports = router;
