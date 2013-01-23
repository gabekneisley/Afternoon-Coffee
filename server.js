//dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');

var app = express();
var port = 3000;

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
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