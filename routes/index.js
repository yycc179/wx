var express = require('express');
var router = express.Router();
const WechatAPI = require('wechat-api')

const sign = require('./sign')

var api = new WechatAPI('wx3b83bf8f1b698b05', 'a09d4a8e2553dfc2276903ce96108df2');

const wechat = require('wechat');
const superagent = require('superagent')

/* GET home page. */
router.get('/', function (req, res, next) {
  api.getTicket((err, r) => {
    if(err) {return next(err)}
    var r = sign(r.ticket, 'http://wx-llyy.rhcloud.com/');
    console.log(r)
    r.title = 'Index'
    res.render('1', r)
  })

});


var config = {
  token: 'my_s_token',
  appid: 'wx752686772c3e8225',
  encodingAESKey: 'QWNZZyonKctSqjQSUgFbAYucu8zLxNPCgyzGeCxmlYd',
  checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

var List = require('wechat').List;
List.add('view', [
  ['回复{a}查看我的性别', function (info, req, res) {
      res.reply('我是个妹纸哟');
  }],
  ['回复{b}查看我的年龄', function (info, req, res) {
      res.reply('我今年18岁');
  }],
  ['回复{c}查看我的性取向', '这样的事情怎么好意思告诉你啦- -']
]);

router.use('/wx', wechat(config, wechat.text(function (message, req, res, next) {
  // message为文本内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }
  if (message.Content === 'list') {
      res.wait('view');
  }
  else if (message.Content == '11') {
      return res.reply([
          {
              title: '你来我家接我吧',
              description: '这是女神与高富帅之间的对话',
              picurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=905870645,2528784422&fm=27&gp=0.jpg',
              url: 'http://wx-llyy.rhcloud.com/'
          }
      ]);
  }
  else {
      superagent.post('http://www.tuling123.com/openapi/api')
          .send({ info: message.Content, userid: message.FromUserName, key: '069e90c4262243bf964ad95014371384' })
          .end((e, r) => {
              if (e) {
                  console.log(e)
                  return res.reply('inner error...');
              }
              res.reply(JSON.parse(r.text).text)
          })
  }


}).image(function (message, req, res, next) {
  // message为图片内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359124971',
  // MsgType: 'image',
  // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
  // MediaId: 'media_id',
  // MsgId: '5837397301622104395' }
}).voice(function (message, req, res, next) {
  // message为音频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'voice',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // Format: 'amr',
  // MsgId: '5837397520665436492' }
}).video(function (message, req, res, next) {
  // message为视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'video',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
}).shortvideo(function (message, req, res, next) {
  // message为短视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'shortvideo',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
}).location(function (message, req, res, next) {
  // message为位置内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125311',
  // MsgType: 'location',
  // Location_X: '30.283950',
  // Location_Y: '120.063139',
  // Scale: '15',
  // Label: {},
  // MsgId: '5837398761910985062' }
}).link(function (message, req, res, next) {
  // message为链接内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'link',
  // Title: '公众平台官网链接',
  // Description: '公众平台官网链接',
  // Url: 'http://1024.com/',
  // MsgId: '5837397520665436492' }
  res.send('success')
}).event(function (message, req, res, next) {
  // message为事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'event',
  // Event: 'LOCATION',
  // Latitude: '23.137466',
  // Longitude: '113.352425',
  // Precision: '119.385040',
  // MsgId: '5837397520665436492' }
  if (message.Event == 'subscribe') {
      res.reply('来撩我吧！！！！！！！')
  }

}).device_text(function (message, req, res, next) {
  // message为设备文本消息内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'device_text',
  // DeviceType: 'gh_d3e07d51b513'
  // DeviceID: 'dev1234abcd',
  // Content: 'd2hvc3lvdXJkYWRkeQ==',
  // SessionID: '9394',
  // MsgId: '5837397520665436492',
  // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
}).device_event(function (message, req, res, next) {
  // message为设备事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'device_event',
  // Event: 'bind'
  // DeviceType: 'gh_d3e07d51b513'
  // DeviceID: 'dev1234abcd',
  // OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
  // Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
  // SessionID: '9394',
  // MsgId: '5837397520665436492',
  // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
})));

var i = 0
router.get('/wechat', function (req, res, next) {
  api.sendText('oByqawkBy0a0j4COOy04IcyXRP2Y', 'Hello ' + ++i, (err, r) => {
    r.err = err
    res.json(r)
  });
});


router.get('/all', function (req, res, next) {
  var op = {
    "text": {
      content: 'Hello ' + ++i
    },
    "msgtype": "text"
  };

  api.getFollowers((err, r) => {
    var oid = r && r.data.openid;
    console.log(oid)
    api.massSend(op, oid, (err, r) => {
      r.err = err
      res.json(r)
    });
  });


});

router.get('/menu', function (req, res, next) {
  api.removeMenu(() => {
    api.createMenu({
      "button": [
        {
          "type": "view",
          "name": "今日头条",
          "url": "http://www.toutiao.com/"
        },
        {
          "name": "菜单",
          "sub_button": [
            {
              "type": "view",
              "name": "搜索",
              "url": "http://www.soso.com/"
            },
            {
              "type": "click",
              "name": "赞一下我们",
              "key": "V1001_GOOD"
            }]
        },
        {
          "type": "view",
          "name": "主页",
          "url": "http://wx-llyy.rhcloud.com/"
        },
      ]
    }, (err, r) => {
      r.err = err
      res.json(r)
    });
  })

});

module.exports = router;
