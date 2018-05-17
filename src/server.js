var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var multer = require('multer'); 
var app = express();
var api = express.Router();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// app.use(bodyParser.json())
app.set('views', path.join(__dirname , 'views') );
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(cookie());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function (req, res, next){
    multer();
    next();
}); // for parsing multipart/form-data

app.use(function (req, res, next) {
  var strReq = req.body;
  console.log(req.url)
  console.log('收到请求，地址为：' + req.url + ' --> 参数为：body -->' + JSON.stringify(req.body));
  console.log('收到请求，Cookie为：' + JSON.stringify(req.cookies));
  next();
})

// 路由级
api.post('/login', function(req, res, next){
    res.send({
      "msg": "登录成功",
      "result": {
        "expire": "2592000",
        "orgCode": "32442",
        "userName": "jd_yhcs1",
        "access_token": "2791901F222FA5DFB5F858522CEA4B97"
      },
      "code": 0
    });
    // res.send({
    //   "msg": "用户名或密码错误",
    //   "result": '',
    //   "code": 2
    // });
    // res.send({
    //   "msg": "用户名不存在",
    //   "result": '',
    //   "code": 3
    // });
});
api.post('/validateTel', function(req, res, next){
    res.send({
      "msg": "验证手机号成功",
      "result": {},
      "successed":true,
      "code": 1
    });
});
api.post('/sendVerifyCode', function(req, res, next){
    res.send({
      "msg": "发送手机验证码成功",
      "result": {},
      "successed":true,
      "code": 0
    });
});

api.post('/generateUid', function(req, res, next){
    res.send({
      "msg": "生成uid成功",
      "result": {
        "uid": "a2sbssa654520254"
      },
      "successed":true,
      "code": 0
    });
});

api.post('/register', function(req, res, next){
    res.send({
      "msg": "注册成功",
      "result": {},
      "successed":true,
      "code": 0
    });
});
api.post('/updatePwd', function(req, res, next){
    res.send({
      "msg": "修改密码成功",
      "result": {},
      "successed":true,
      "code": 0
    });
});
api.post('/logout', function(req, res, next){
    res.send({
      "msg": "退出成功",
      "result": {},
      "successed":true,
      "code": 0
    });
});
app.use('/user', api)

app.post('/code/graphCode', function(req, res, next){
  res.send({
    "msg": "生成图片验证码成功",
    "result": {
      "imgSrc": "https://www.jdpay.com/common/checkcode.htm?v=" + parseInt(Math.random() * 1000)
    },
    "successed":true,
    "code": 0
  });
});

// app.get('/*', function(req, res) {
//   res.send('1111');
// });

app.listen(8088);