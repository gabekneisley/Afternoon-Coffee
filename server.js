//dependencies
var express = require('express');
var lessMiddleware = require('less-middleware');

var app = express();
var port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));

//set up less to auto-compile

app.use(lessMiddleware({
  dest: __dirname + '/public/stylesheets',
  src: __dirname + '/less',
  prefix: '/stylesheets',
  compress: true
}));


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Home'
  })
});

app.get('/hello', function(req, res) {
  res.end("hi there!");
});

app.listen(port);
console.log('Listening on port ' + port);

/*
var http = require('http');
var port = '8124';
var root = "127.0.0.1"
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, root);
console.log('Server running at http://' + root + ':' + port + '/');
*/