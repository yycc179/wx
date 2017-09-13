var express = require('express');
var router = express.Router();
const WechatAPI = require('wechat-api')

var api = new WechatAPI('wx3b83bf8f1b698b05', 'a09d4a8e2553dfc2276903ce96108df2');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('ok')
});

var i = 0
router.get('/wechat', function(req, res, next) {
  api.sendText('oByqawkBy0a0j4COOy04IcyXRP2Y', 'Hello ' + ++ i, (err, r) => {
    r.err = err
    res.json(r)
  });
});


router.get('/all', function(req, res, next) {
  api.massSend('o3NPW0r_fi2BL8-zYrJuryidCuCY', 'Hello ' + ++ i, (err, r) => {
    r.err = err
    res.json(r)
  });
});

module.exports = router;
