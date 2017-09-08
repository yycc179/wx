var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.query());

var wechat = require('wechat');

app.use('/', wechat(config, function (req, res, next) {
  var message = req.weixin;
  console.log(message)
  res.reply([
    {
      title: '你来我家接我吧',
      description: '这是女神与高富帅之间的对话',
      picurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504882319721&di=6ba74bf2dad3cea7da0f5725ca7c6ffa&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D99f47a0d7ef0f736d8ab44053f659f2f%2Fb03533fa828ba61e9a43845d4734970a304e5916.jpg',
      url: 'http://nodeapi.cloudfoundry.com/'
    }
  ]);
}));

var wechat = require('wechat');
var config = {
  token: 'my_s_token',
  appid: 'wx752686772c3e8225',
  encodingAESKey: 'QWNZZyonKctSqjQSUgFbAYucu8zLxNPCgyzGeCxmlYd',
  checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

app.use('/xx', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
