var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var multer = require('multer'); 
var app = express();
var api = express.Router();


// app.use(bodyParser.json())
app.set('views', path.join(__dirname , 'views') );
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function (req, res, next){
    multer();
    next();
}); // for parsing multipart/form-data

app.use(function (req, res, next) {
  var strReq = req.body;
  console.log('收到请求，地址为：' + req.url + ' --> 参数为：body -->' + JSON.stringify(req.body));
  next();
})

var urlPath = ['login', 'getBdVisitResult', 'createBdVisit', 'updateBdVisit', 'queryBdVisitHistory', 'delBdVisitHistory', 'getBdVisitHistoryByHistoryId',
                'createRackCommunity', 'queryGrRackCommunity', 'getCommunityInfoById', 'updateRackCommunity', 'batchCreateGrRackByName', 'queryGrRackInfo']

// 路由级
api.post('/bd/login', function(req, res, next){
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
});

app.use('/api', api)

app.get('/api', function(req, res) {
  var query = req.query
  var str = 'hello world!' + query
  res.send({
    code: 'A00001',
    a: '12321'
  })
    // res.render('index.ejs', { title: '测试11111' });
});

app.get('/index', function(req, res) {
  res.render('index.ejs', {
    title: '测试11111',
    links: '<link rel="icon" href="/favicon.ico" type="image/x-icon">',
    script: '<script src="1"></script>'
  });
});

app.get('/*', function(req, res) {
  res.send('1111');
});

app.listen(80);