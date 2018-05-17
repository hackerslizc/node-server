const fs = require('fs');
const URL = require('url');
const http = require('http');
const request = require('request');

const port = 9901;
// const homeHTML = fs.readFileSync('template/index.html', 'utf-8'); // 自定义的首页内容

function requestInstance(url, ua) {
  return request({
    url,
    headers: { 'User-Agent': ua }
  })
}

const Server = http.createServer((req, res) => {
  const url = URL.parse(req.url, true);
  if (url.pathname === '/') {
    // 自定义首页
    res.writeHeader('200', { 'Contetn-Type': 'text/html' });
    fs.createReadStream('./home.html').pipe(res);
  } else if (url.pathname === '/bg') {
    // 每日必应壁纸加速（给首页用，具体可看源码内逻辑）
    req.pipe(requestInstance(`https://bing.ioliu.cn/v1?${url.search}`, req.headers['user-agent'])).pipe(res);
  } else {
    // 这个就是最重要的一步了，将客户端来的请求，按照规则直接代理到 `google.com` 下
    // 这样客户端拿到的内容也是谷歌返回的内容了
    // 因为请求是服务端转发到谷歌，所以翻墙这一步也就免了
    req.pipe(requestInstance(`https://www.google.com/${url.path}`, req.headers['user-agent'])).pipe(res);
  }
});

// 启动服务
Server.listen(port, () => {
  console.log(`Server on port ${port}`);
});